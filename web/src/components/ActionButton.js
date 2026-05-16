import React from 'react';
import { Stack, Button, Typography, Box, Badge } from '@mui/material';
import { Add as AddIcon, ImportExport, Tune } from '@mui/icons-material';

const ActionButtons = ({title="Trips", role=null, showAddModal=null, showModal=null, 
    is_all_trips=true }) => {
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
       {is_all_trips && (
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            {/* {role && role?.some(e => e.perm_name === 
            "add_driver") && ( */}
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
                Add Company
            </Button>
            {/* // )} */}

            <Button
            variant="outlined"
            color="secondary"
            startIcon={<ImportExport />}
            onClick={showModal}
            sx={{
                borderRadius: '8px',
                px: 3,
                py: 1,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': { borderWidth: 2 }
            }}
            >
            Export
            </Button>
            </Stack>
       )}  
     
    </Box>
  );
};

export default ActionButtons;