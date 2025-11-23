import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Alert,
    Chip,
    Grid
} from "@mui/material";
import { applicationAPI } from "../../api/realApi";

export default function ApplicationStatus() {
    const [app, setApp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const applicationId = searchParams.get("id");

    useEffect(() => {
        if (applicationId) {
            loadStatus();
        }
    }, [applicationId]);

    async function loadStatus() {
        if (!applicationId) return;

        setLoading(true);
        try {
            const response = await applicationAPI.getById(applicationId);
            console.log("✅ Данные заявки:", response.data);
            setApp(response.data);
        } catch (error) {
            console.error("❌ Ошибка загрузки заявки:", error);
        } finally {
            setLoading(false);
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'warning',
            'approved': 'success',
            'rejected': 'error',
            'processing': 'info',
            'manual_review': 'secondary'
        };
        return colors[status] || 'default';
    };

    const getStatusText = (status) => {
        const texts = {
            'pending': 'Ожидает',
            'approved': 'Одобрена',
            'rejected': 'Отклонена',
            'processing': 'В обработке',
            'manual_review': 'На ручной проверке'
        };
        return texts[status] || status;
    };

    if (!applicationId) {
        return (
            <Alert severity="warning">
                Не указан ID заявки
            </Alert>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Детали заявки #{applicationId}
                </Typography>

                <Button
                    onClick={loadStatus}
                    variant="outlined"
                    disabled={loading}
                    sx={{ mb: 2 }}
                >
                    {loading ? "Обновление..." : "Обновить статус"}
                </Button>

                {app ? (
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Статус:</strong></Typography>
                                <Chip
                                    label={getStatusText(app.status)}
                                    color={getStatusColor(app.status)}
                                    size="medium"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Scoring статус:</strong></Typography>
                                <Typography>{app.scoring_status || "Не обработан"}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Сумма кредита:</strong></Typography>
                                <Typography>{app.loan_amount ? `${app.loan_amount.toLocaleString()} руб.` : 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Срок кредита:</strong></Typography>
                                <Typography>{app.loan_term ? `${app.loan_term} мес.` : 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>ИНН:</strong></Typography>
                                <Typography>{app.inn || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Паспорт:</strong></Typography>
                                <Typography>{app.passport_number || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Scoring балл:</strong></Typography>
                                <Typography>{app.scoring_score || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Дата создания:</strong></Typography>
                                <Typography>{app.created_at ? new Date(app.created_at).toLocaleString() : 'N/A'}</Typography>
                            </Grid>

                            {app.rejection_reason && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        <strong>Причина отказа:</strong> {app.rejection_reason}
                                    </Alert>
                                </Grid>
                            )}

                            {app.scoring_data && (
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1"><strong>Данные скоринга:</strong></Typography>
                                    <Box sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                                        <pre>{JSON.stringify(app.scoring_data, null, 2)}</pre>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                ) : (
                    <Typography>Заявка не найдена</Typography>
                )}
            </CardContent>
        </Card>
    );
}