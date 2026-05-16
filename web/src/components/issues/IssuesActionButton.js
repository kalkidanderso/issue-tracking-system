import React from 'react';
import { Stack, Button, Typography, Box, Badge } from '@mui/material';
import { Add as AddIcon, ImportExport, Tune } from '@mui/icons-material';

const ActionButtons = ({title="Issues",  showAddModal=null, showModal=null,
     is_user=true }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 3,
      p: 2,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h5" sx={{ 
        fontWeight: 600,
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box component="span" sx={{ 
          width: 4,
          height: 24,
          backgroundColor: 'primary.main',
          borderRadius: '2px',
          display: 'block'
        }} />
        {title}
      </Typography>
       {is_user && (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={showAddModal}
                      sx={{
                      borderRadius: '8px',
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': { boxShadow: 1 }
                      }}
                  >
                      Add Ticket
                  </Button>
                  

           
            </Stack>
       )}  
       
     
    </Box>
  );
};

export default ActionButtons;