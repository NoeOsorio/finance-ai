import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

type FinancialSummaryProps = {
    balance: number;
    income: number;
    expenses: number;
};

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ balance, income, expenses }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Saldo Actual
                        </Typography>
                        <Typography variant="h4" color="text.secondary">
                            ${balance}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Ingresos Recientes
                        </Typography>
                        <Typography variant="h4" color="text.secondary">
                            ${income}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Egresos Recientes
                        </Typography>
                        <Typography variant="h4" color="text.secondary">
                            ${expenses}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default FinancialSummary;
