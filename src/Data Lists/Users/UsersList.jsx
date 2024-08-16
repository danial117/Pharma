import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import CustomButton from './customButton';

const CustomRecordList = ({ resource }) => {
    const dataProvider = useDataProvider();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        dataProvider.getList(resource, {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'id', order: 'ASC' },
            filter: {}
        })
        .then(({ data }) => {
            setRecords(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [dataProvider, resource]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    return (
        <div>
            {records.map(record => (
                <Card key={record.id} style={{ margin: '1em' }}>
                    <CardContent>
                        <Typography variant="h5">ID: {record.id}</Typography>
                        <Typography variant="h6">Name: {record.name}</Typography>
                        <Typography variant="body1">Email: {record.email}</Typography>
                        <Typography variant="body2">Auth Method: {record.authenticationMethod}</Typography>
                        <CustomButton />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default CustomRecordList;