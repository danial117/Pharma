import { List, Datagrid, TextField, useRecordContext, useResourceContext,CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,ShowButton } from 'react-admin';

    const ImageField = ({ source }) => {
        const record = useRecordContext();
        console.log(record)
        if (!record ) return null;
        return <img src={`${process.env.VITE_API_URL}/assets/news/${record.imageUrl}`} alt="" style={{ maxWidth: '200px', height: '100px' }} />;
    };

    const ListActions = () => (
        <TopToolbar>
            <SelectColumnsButton />
            <ImageField />
            <CreateButton/>
            <ExportButton/>
        </TopToolbar>
    );

const NewsList = (props) =>{ 
  
    
    return(
    <List actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField  source="id" />
            <ImageField />
            <TextField source="title" />
            <TextField source="topic" />
            <ShowButton />
           
            
        </Datagrid>
    </List>
);
}
export default NewsList;