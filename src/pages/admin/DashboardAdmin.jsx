import { useState, useEffect } from 'react';
import {
    Grid, Card, CardContent, Typography, Box,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Button
} from '@mui/material';
import { adminAPI } from '../../api/realApi';

export default function DashboardAdmin() {
    const [stats, setStats] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [statsResponse, applicationsResponse] = await Promise.all([
                adminAPI.getDashboardStats(),
                adminAPI.getAllApplications({ size: 5 })
            ]);

            setStats(statsResponse.data);
            setRecentApplications(applicationsResponse.data.items || []);
        } catch (error) {
            console.error('Ошибка загрузки дашборда:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'warning',
            'approved': 'success',
            'rejected': 'error',
            'processing': 'info'
        };
        return colors[status] || 'default';
    };

    if (loading) return <Typography>Загрузка...</Typography>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Админ панель</Typography>

            {/* Статистика */}
            {stats && (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Всего заявок</Typography>
                                <Typography variant="h5">{stats.total_applications}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Одобрено</Typography>
                                <Typography variant="h5" color="success.main">{stats.approved_applications}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>Отклонено</Typography>
                                <Typography variant="h5" color="error.main">{stats.rejected_applications}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>На проверке</Typography>
                                <Typography variant="h5" color="warning.main">{stats.pending_applications}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}

            {/* Последние заявки */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Последние заявки</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Пользователь</TableCell>
                                    <TableCell>Сумма</TableCell>
                                    <TableCell>Статус</TableCell>
                                    <TableCell>Дата</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentApplications.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell>#{app.id}</TableCell>
                                        <TableCell>User #{app.user_id}</TableCell>
                                        <TableCell>{app.loan_amount?.toLocaleString()} руб.</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={app.status}
                                                color={getStatusColor(app.status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(app.created_at).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={() => window.location.href = '/admin/applications'}
                    >
                        Все заявки
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}