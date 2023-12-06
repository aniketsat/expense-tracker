import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {Divider, IconButton, MenuItem, Select, TextField} from "@mui/material";
import Loader from "./Loader.jsx";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import { addAccount, updateAccount, deleteAccount } from "../store/features/accountSlice.js";
import { useCreateAccountMutation, useUpdateAccountMutation, useDeleteAccountMutation } from "../store/services/accountApi.js";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: {sm: "98%", md: 600}
};

// eslint-disable-next-line react/prop-types
function CreateAccountModal({ accountTypes, icon, account }) {
    const dispatch = useDispatch();

    // eslint-disable-next-line react/prop-types
    const [accountName, setAccountName] = useState(account?.name || "");
    // eslint-disable-next-line react/prop-types
    const [accountType, setAccountType] = useState(account?.type || "");
    // eslint-disable-next-line react/prop-types
    const [initialBalance, setInitialBalance] = useState(account?.balance || 0);

    const [accountId, setAccountId] = useState(null);
    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        if (account && account?._id) {
            // eslint-disable-next-line react/prop-types
            setAccountId(account._id);
        }
    }, [account]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        if (account) {
            // eslint-disable-next-line react/prop-types
            setAccountName(account?.name);
            // eslint-disable-next-line react/prop-types
            setAccountType(account?.type);
            // eslint-disable-next-line react/prop-types
            setInitialBalance(account?.balance);
        }
    }
    const handleClose = () => {
        setAccountName("");
        setAccountType(accountTypes[0]);
        setInitialBalance(0);
        setOpen(false)
    }

    useEffect(() => {
        if (accountTypes) {
            setAccountType(accountTypes[0]);
        }
    }, [accountTypes]);

    const [createAccountMutation, { isLoading: isCreating }] = useCreateAccountMutation();
    const [updateAccountMutation, { isLoading: isUpdating }] = useUpdateAccountMutation();
    const [deleteAccountMutation, { isLoading: isDeleting }] = useDeleteAccountMutation();

    const createAccountFunc = async () => {
        if (accountName === "") {
            toast.error("Please enter an account name");
            return;
        }
        try {
            const res = await createAccountMutation({
                name: accountName,
                type: accountType,
                balance: initialBalance,
            }).unwrap();
            dispatch(addAccount(res?.account));
            toast.success(res?.message || "Account created successfully");
            handleClose();
        } catch (err) {
            console.log(err);
            toast.error("Failed to create account");
        } finally {
            handleClose();
        }
    }

    const updateAccountFunc = async (accountId) => {
        if (accountName === "") {
            toast.error("Please enter an account name");
            return;
        }
        try {
            const res = await updateAccountMutation({
                accountId: accountId,
                name: accountName,
                type: accountType,
                balance: initialBalance,
            }).unwrap();
            dispatch(updateAccount(res?.account));
            toast.success(res?.message || "Account updated successfully");
            handleClose();
        } catch (err) {
            console.log(err);
            toast.error("Failed to update account");
        }
    };

    const deleteAccountFunc = async (accountId) => {
        try {
            const res = await deleteAccountMutation(accountId).unwrap();
            dispatch(deleteAccount(res?.account));
            toast.success(res?.message || "Account deleted successfully");
            handleClose();
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete account");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (accountId) {
            await updateAccountFunc(accountId);
        } else {
            await createAccountFunc();
        }
    }

    return (
        <>
            {(isCreating || isUpdating || isDeleting) && <Loader />}
            {
                icon ? (
                    <IconButton onClick={handleOpen}>
                        {icon}
                    </IconButton>
                ) : (
                    <Button sx={{ marginX: 2 }} variant={"contained"} startIcon={<AddIcon />} onClick={handleOpen}>Add Account</Button>
                )
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h4">
                        Add a new account
                    </Typography>
                    <Box component={"form"} sx={{marginTop:2}}>
                        <TextField
                            id="outlined-basic"
                            label="Account Name"
                            variant="outlined"
                            fullWidth
                            sx={{marginBottom:2}}
                            value={accountName}
                            onChange={(e)=>setAccountName(e.target.value)}
                        />
                        <Select
                            fullWidth
                            sx={{marginBottom:2}}
                            variant={"outlined"}
                            value={accountType}
                            onChange={(e)=> setAccountType(e.target.value)}
                        >
                            {
                                // eslint-disable-next-line react/prop-types
                                accountTypes?.map((type, index) => (
                                    <MenuItem key={index} value={type}>{type}</MenuItem>
                                ))
                            }
                        </Select>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Initial Balance"
                            variant="outlined"
                            sx={{marginBottom:2}}
                            type={"number"}
                            InputLabelProps={{ shrink: true }}
                            value={initialBalance}
                            onChange={(e)=>setInitialBalance(e.target.value)}
                        />
                        <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                            <Button sx={{marginRight:2}} variant={"contained"} onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant={"contained"} onClick={handleSubmit}>Save</Button>
                        </Box>
                    </Box>
                    <Divider sx={{marginTop: 2, marginBottom: 2}} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button variant={"text"} sx={{ color: "red",}}
                                disabled={!accountId}
                                onClick={() => deleteAccountFunc(accountId)}
                        >
                            Delete Account
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default CreateAccountModal;