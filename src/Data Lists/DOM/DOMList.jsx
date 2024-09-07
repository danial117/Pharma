
import { List, Datagrid, TextField,CreateButton,
  
    ExportButton,
   
    SelectColumnsButton,
    TopToolbar,
   
ShowButton, 
EditButton} from 'react-admin';

    const ListActions = () => (
        <TopToolbar>
          
           
           
            <ExportButton/>
        </TopToolbar>
    );

const DomList = (props) =>{ 
  
    
    return(
    <List actions={<ListActions/>}>
        <Datagrid  rowClick='edit'>
            <TextField  source="id" />
            <TextField  source="HomePageMainBanner" />
            <TextField source="HomePageMainBannerText.text1" />
            <TextField source="HomePageMainBannerText.text2" />
           
           
            
        </Datagrid>
    </List>
);
}
export default DomList;






