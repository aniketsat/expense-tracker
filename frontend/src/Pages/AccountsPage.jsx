import {
    Card,
    CardContent,
    Container,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CreateAccountModal from "../Components/CreateAccountModal.jsx";
import Loader from "../Components/Loader.jsx";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {setAccounts} from "../store/features/accountSlice.js";
import { useGetAccountTypesQuery, useGetAccountsQuery } from "../store/services/accountApi.js";

function AccountsPage() {
    const [accountTypes, setAccountTypes] = useState([]);

    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.account.accounts);

    const { data:accountTypesData, isLoading: isAccountTypesLoading } = useGetAccountTypesQuery();
    useEffect(() => {
        if (accountTypesData) {
            setAccountTypes(accountTypesData?.types);
        }
    }, [accountTypesData]);

    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { data:accountsData, isLoading: isAccountsLoading } = useGetAccountsQuery();

    useEffect(() => {
        dispatch(setAccounts(accountsData?.accounts));
    }, [accountsData?.accounts, dispatch]);

    return (
        <>
            {isAccountTypesLoading || isAccountsLoading && <Loader />}
            <Container maxWidth="md">
                <Card
                    sx={{
                        marginTop: 2,
                        py: 2,
                    }}
                >
                    <CardContent
                        sx={{
                            padding: 0,
                        }}
                    >
                        <CreateAccountModal accountTypes={
                            accountTypes?.map((type) => type?.type)
                        } />

                        <Divider sx={{marginTop: 2, marginBottom: 2}} />

                        {
                            accountTypes?.map((type, index) => (
                                <Accordion
                                    key={index}
                                    sx={{
                                        boxShadow: "none",
                                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                                    }}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                >
                                    <AccordionSummary
                                        sx={{
                                            paddingX: 2,
                                            paddingY: 0,
                                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        }}
                                    >
                                        <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                            <Typography variant={"h6"}>{type?.type}</Typography>
                                            <Typography variant={"h6"} color={"text.secondary"}>{
                                                accounts?.filter((account) => account?.type === type?.type)
                                                    .reduce((acc, account) => acc + account?.balance, 0)
                                            }{" "}INR</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        sx={{
                                            paddingX: 2,
                                            paddingY: 1,
                                        }}
                                    >
                                        {
                                            accounts?.filter((account) => account?.type === type?.type).length === 0 && (
                                                <Typography variant={"body1"} color={"text.secondary"}>No accounts added yet</Typography>
                                            )
                                        }
                                        {
                                            accounts?.map((account, index) => (
                                                account?.type === type?.type && (
                                                    <Box key={index} sx={{width:"100%", display:"flex", justifyContent:"space-between", marginBottom:1}}>
                                                        <Typography variant={"body1"} color={"text.primary"}>{account?.name}</Typography>
                                                        <Box sx={{display:"flex", alignItems:"center", gap:1}}>
                                                            <Typography variant={"body1"} color={"text.secondary"}>{account?.balance} INR</Typography>
                                                            <CreateAccountModal accountTypes={
                                                                accountTypes?.map((type) => type?.type)
                                                            } icon={<EditIcon />} account={account} />
                                                        </Box>
                                                    </Box>
                                                )
                                            ))
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }

                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default AccountsPage;