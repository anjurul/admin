import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Col, Button, Modal, Container, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Menu from '../components/Menu';
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";

class ContactPage extends Component {
    constructor(){
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            selectedRowId:"",
            deleteBtnText:"Delete",
            AddBtnText:"Add New",
            AddNewModal:false
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.addModalOpen=this.addModalOpen.bind(this);
        this.addModalClose=this.addModalClose.bind(this);
    }


    addModalOpen(){
        this.setState({AddNewModal:true})
    }

    addModalClose(){
        this.setState({AddNewModal:false})
    }
   
    
    componentDidMount(){
        axios.get('/ContactList').then((response)=>{
            if (response.status===200) {
                this.setState({dataList:response.data,isLoading:false}); 
            }
            else{
                this.setState({isLoading:false,isError:true});
            }
        }).catch((error)=>{
            this.setState({isLoading:false,isError:true});
        })
    }

    dataDelete(){
        let confirmResult=confirm("Do you want to delete?")
        if (confirmResult===true) {
            this.setState({deleteBtnText:"Deleting..."})
        axios.post('/ContactDelete',{id:this.state.selectedRowId}).then((response)=>{
            if (response.data==1 && response.status==200) {
                this.setState({deleteBtnText:"Delete succes"});
                this.componentDidMount();
                setTimeout(function(){
                    this.setState({deleteBtnText:"Delete"});
                }.bind(this),1000)
            } else {
                this.setState({deleteBtnText:"Delete Failed"});
                setTimeout(function(){
                    this.setState({deleteBtnText:"Delete"})
                }.bind(this),1000)
            }
        }).catch((error=>{
            this.setState({deleteBtnText:"Delete Failed"});
            setTimeout(function(){
                    this.setState({deleteBtnText:"Delete"});
            }.bind(this),1000)
        }))
        }
        
    }
    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
          this.setState(() => ({
            selectedRowId: [...this.state.selectedRowId, row.id]
          }));
        } else {
          this.setState(() => ({
            selectedRowId: this.state.selectedRowId.filter(x => x !== row.id)
          }));
        }
    }
    
    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
            this.setState(() => ({
            selected: ids
            }));
        } else {
            this.setState(() => ({
            selected: []
            }));
        }
    }
    render() {
        if (this.state.isLoading===true) {
            return(
                <Menu title="Contact">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        } else if (this.state.isError===true) {
            return(
                <Menu title="Contact">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{
            
        
            const data = this.state.dataList;
            const columns=[
                {dataField: 'id', text: 'ID'},
                {dataField: 'name', text: 'NAME'},
                {dataField: 'email', text: 'EMAIL'},
                {dataField: 'message', text: 'MESSAGE'}
            ];
            // const selectRow = {
            //     mode: 'checkbox',
            //     clickToSelect: true,
            //     onSelect:(row,isSelect,rowIndex)=>{
            //         this.setState({selectedRowId:row['id']});
            //     },
            //     onSelectAll:(row,isSelect,rowIndex)=>{
            //         this.setState({selectedRowId:row['id']});
            //     }
            // };
            const selectRow = {
                mode: 'checkbox',
                clickToSelect: true,
                selectedRowId: this.state.selectedRowId,
                onSelect: this.handleOnSelect,
                onSelectAll: this.handleOnSelectAll
            };
            return (
                <Fragment>
                    <Menu title="Contact">
                        <Container>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                <button onClick={this.dataDelete} className="normal-btn  btn">{this.state.deleteBtnText}</button>
                                <button onClick={this.addModalOpen} className="normal-btn ms-2 btn">{this.state.AddBtnText}</button>
                                <BootstrapTable keyField='id' data={ data } selectRow={selectRow} columns={ columns } pagination={ paginationFactory() } striped hover condensed />
                                </Col>
                            </Row>
                        </Container>
                    </Menu>


                    <Modal size="lg" show={this.state.AddNewModal} onHide={this.addModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Woohoo, you're reading this text in a modal!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary">
                                Save Changes
                            </Button>
                            <Button variant="secondary" onClick={this.addModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
            );
        }
    }
}

export default ContactPage;