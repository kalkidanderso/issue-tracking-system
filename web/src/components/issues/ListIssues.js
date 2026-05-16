import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../deleteConfirmation.js";
import Table from "../Theme/Table.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit.js";
import Badge from "@mui/material/Badge";
import { Button } from "react-bootstrap";
import Spinner from "../Spinner.js";
import Add from "./Add.js";
import { useContext } from "react";
import ActionButtons from "./IssuesActionButton.js";

// Import for attractive button styling
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import KeyIcon from '@mui/icons-material/VpnKey';


// Import for attractive button styling
import Chip from '@mui/material/Chip';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';


const IssuesList = () => {
  // Role Context

  // State Management
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [resetLoading, setResetLoading] = useState({});

  // Modal State
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);

  // Styled Attractive Button
  const ResetButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #1e40af 30%, #2563eb 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 36,
    padding: '0 20px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 6px 2px rgba(255, 105, 135, .4)',
      background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    }
  }));

  // Fetch Issues
  const getIssues = async () => {
    try {
      const response = await axios.get("issues/");
      setIssues(response.data);
      setLoading(false);
      notify();
    } catch (err) {
      notifyError("Failed to load issues");
    }
  };

 

  // Notifications
  const notify = () => toast.success("Issues list loaded.", toastConfig);
  const notifySuccess = (message) => toast.success(message, toastConfig);
  const notifyError = (message) => toast.error(message, toastConfig);

  // Toast Configuration
  const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  // Delete Issue
  const deletePermission = async (id) => {
    try {
      await axios.delete("/issues/" + id, { data: { id } });
      getIssues();
      notifySuccess("Issue deleted successfully");
    } catch (error) {
      notifyError("Failed to delete issue");
    }
  };

  // Modal Handlers
  const showAddModal = () => setDisplayAddModal(true);
  const hideAddModal = () => setDisplayAddModal(false);
  const showEditModal = (id) => {
    setId(id);
    setData(null);
    setDisplayEditModal(true);
    axios
      .get("/issues/" + id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => {
        notifyError("Failed to load issue");
      });
  };
  const hideEditModal = () => setDisplayEditModal(false);
  const showDeleteModal = (id, name) => {
    setId(id);
    setDeleteMessage(`Are you sure you want to delete this issue?`);
    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => setDisplayConfirmationModal(false);

  // Submit Delete
  const submitDelete = (id) => {
    deletePermission(id);
    setDisplayConfirmationModal(false);
  };

  // Initial Data Fetch
  useEffect(() => {
    getIssues();
  }, []);

  // Columns Configuration with Enhanced Styling
  const columns = useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          { Header: "Id", accessor: "id" },
          { Header: "Title", accessor: "title" },
          { Header: "Description", accessor: "description" },
          {
            Header: "Status",
            accessor: "status",
            disableFilters: true,
            Cell: (row) => {
              const status = row.cell.row.original.status;
              return (
                <Chip 
                  label={status} 
                  color={status === "Active" ? "success" : "error"}
                  variant="filled"
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: status === "Active" 
                      ? '0 2px 4px rgba(0,255,0,0.2)' 
                      : '0 2px 4px rgba(255,0,0,0.2)'
                  }}
                />
              );
            },
          },
          
          {
            Header: "Action",
            accessor: "action",
            disableFilters: true,
            Cell: (row) => (
              <div style={{ 
                display: "flex", 
                gap: "15px", 
                alignItems: 'center' 
              }}>
                  <Tooltip title="Edit Ticket">
                    <span>
                      <EditIcon 
                        color="primary" 
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.2)',
                            color: '#1e40af'
                          }
                        }}
                        onClick={() => showEditModal(row.cell.row.original.id)}
                      />
                    </span>
                  </Tooltip>
                  <Tooltip title="Delete Issue">
                    <span>
                      <DeleteIcon 
                        color="error" 
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.2)',
                            color: '#ff0000'
                          }
                        }}
                        onClick={() => showDeleteModal(row.cell.row.original.id)}
                      />
                    </span>
                  </Tooltip>
              </div>
            ),
          },
        ],
      },
    ],
    [resetLoading]
  );

  return (
    <div className="content-wrappers">
      <ToastContainer />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <ActionButtons 
                  title="Issue tracking System" 
                  showAddModal={showAddModal} 
                />
                <div className="card-body">
                  {loading ? (
                    <Spinner />
                  ) : (
                    // <p>test</p>
                    <Table 
                      columns={columns} 
                      data={issues} 
                      edit="issue" 
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={id}
        message={deleteMessage}
      />

      {displayEditModal && (
        <Edit
          id={id}
          data={data}
          showModal={displayEditModal}
          hideModal={hideEditModal}
          getedit={getIssues}
        />
      )}

      <Add 
        showModal={displayAddModal}
        hideModal={hideAddModal}
        getadd={getIssues}
      />
    </div>
  );
};

export default IssuesList;
