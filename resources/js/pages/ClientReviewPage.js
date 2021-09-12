import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Menu from '../components/Menu';
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import { Link } from 'react-router-dom';

class ClientReviewPage extends Component {
    constructor(){
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            isEdit: true,
            selectedRowId:"",
            deleteBtnText:"Delete",
            AddBtnText:"Add New",
            EditBtnText:"Edit",
            AddNewModal:false,
            EditNewModal:false,
            AddTitle:"",
            AddDes:"",
            AddFile:"",
            editTitle:"",
            editDes:"",
            editFile:"",
            EditModalData:[]

        }
        this.dataDelete=this.dataDelete.bind(this);
        this.ImgCellFormat=this.ImgCellFormat.bind(this);
        this.addModalOpen=this.addModalOpen.bind(this);
        this.addModalClose=this.addModalClose.bind(this);
        this.titleOnChange=this.titleOnChange.bind(this);
        this.desOnChange=this.desOnChange.bind(this);
        this.fileOnChange=this.fileOnChange.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);

        this.editModalOpen=this.editModalOpen.bind(this);
        this.editModalClose=this.editModalClose.bind(this);
        this.titleOnChange=this.titleOnChange.bind(this);
        this.desOnChange=this.desOnChange.bind(this);
        this.fileOnChange=this.fileOnChange.bind(this);
        this.updateFormSubmit=this.updateFormSubmit.bind(this);
        this.onEdit.bind(this);
    }



    editModalOpen = () =>{
        this.setState({
            EditNewModal: true
        })
        
    }
    

    editModalClose(){
        this.setState({EditNewModal:false})
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    onEdit = ()=>{
        const rowId=this.state.selectedRowId;
        console.log(rowId);
        axios.get(`http://127.0.0.1:8000/api/editReview/${rowId}`).then((res)=>{
            
            
            if (res.data.status == 200) {
                this.setState({
                    EditNewModal: true,
                    EditModalData:res.data,
                    editTitle:res.data.review.client_title,
                    editDes:res.data.review.client_description,
                    editFile:res.data.review.client_img,
                })

                console.log(this.state.editTitle)
                console.log(this.state.editDes)
                console.log(this.state.editFile)
            }
        }) 
    }

    updateFormSubmit(event){
        // let title=this.state.addTitle;
        // let des=this.state.addDes;
        // let photo=this.state.addFile;
        // let photoSize=photo.size;
        // let photoName=photo.name;
        
        // let Url="/AddReview";

        // let myFormData=new FormData();
        // myFormData.append('title',title);
        // myFormData.append('des',des);
        // myFormData.append('photo',photo);

        // let config={
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }

        // axios.post(Url,myFormData,config).then((response)=>{
        //     if (response.data===1) {
        //         this.addModalClose();
        //         this.componentDidMount();

        //     }
        // }).catch((error)=>{
        //     alert(error);
        // })

        // event.preventDefault();
    }


    addModalOpen(){
        this.setState({AddNewModal:true})
    }

    addModalClose(){
        this.setState({AddNewModal:false})
    }

    titleOnChange(event){
        let title=  event.target.value;
        this.setState({addTitle:title})
  
    }
  
    desOnChange(event){
          let des=  event.target.value;
          this.setState({addDes:des})
  
    }
  
    fileOnChange(event){
          let photo=  event.target.files[0];
          this.setState({addFile:photo})
  
    }

    addFormSubmit(event){
        let title=this.state.addTitle;
        let des=this.state.addDes;
        let photo=this.state.addFile;
        let photoSize=photo.size;
        let photoName=photo.name;
        
        let Url="/AddReview";

        let myFormData=new FormData();
        myFormData.append('title',title);
        myFormData.append('des',des);
        myFormData.append('photo',photo);

        let config={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post(Url,myFormData,config).then((response)=>{
            if (response.data===1) {
                this.addModalClose();
                this.componentDidMount();

            }
        }).catch((error)=>{
            alert(error);
        })

        event.preventDefault();
    }

   
    
    componentDidMount(){
        axios.get('/ReviewList').then((response)=>{
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
        axios.post('/ReviewDelete',{id:this.state.selectedRowId}).then((response)=>{
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
                selectedRowId: ids
            }));
        } else {
            this.setState(() => ({
                selectedRowId: []
            }));
        }
    }
    ImgCellFormat(cell,row){
        return(
            <img className="table-cell-img" src={cell}/>
        )
    }

    
    
    
    
    

    // linkEdit = (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <Button
    //         onClick={() => {
    //           this.onEdit(row),
    //           this.onEdit.bind(this, id,)
    //         }}
    //       >
    //         Edit
    //       </Button>
    //     );
    // };
    
    render() {
        
        if (this.state.isLoading===true) {
            return(
                <Menu title="Review">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        } else if (this.state.isError===true) {
            return(
                <Menu title="Review">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{
            
        
            const data = this.state.dataList;
            const columns=[
                {dataField: 'id', text: 'ID'},
                {dataField: 'client_img', text: 'Image',formatter:this.ImgCellFormat},
                {dataField: 'client_title', text: 'Name'},
                {dataField: 'client_description', text: 'Description'},
                // {
                //     dataField: "follow",
                //     text: "Follow",
                //     formatter: this.linkEdit,
                //     sort: true
                // }
            ];
            
            const selectRow = {
                mode: 'checkbox',
                clickToSelect: true,
                selectedRowId: this.state.selectedRowId,
                onSelect: this.handleOnSelect,
                onSelectAll: this.handleOnSelectAll
            };
            return (
                <Fragment>
                    <Menu title="Review">
                        <Container>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                <button onClick={this.dataDelete} className="normal-btn  btn">{this.state.deleteBtnText}</button>
                                <button onClick={this.addModalOpen} className="normal-btn ms-2 btn">{this.state.AddBtnText}</button>
                                <button onClick={this.onEdit} className="normal-btn ms-2 btn">{this.state.EditBtnText}</button>
                                <BootstrapTable keyField='id' data={ data } selectRow={selectRow} columns={ columns } pagination={ paginationFactory() } striped hover condensed />
                                </Col>
                            </Row>
                        </Container>
                    </Menu>

                    
                    <Modal size="lg" show={this.state.AddNewModal} onHide={this.addModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                
                                <Form.Group className="mb-3" >
                                    <Form.Label>Review Title</Form.Label>
                                    <Form.Control onChange={this.titleOnChange} type="text" placeholder="Review title" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.desOnChange} type="text" placeholder="Review Description" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Review Image</Form.Label>
                                    <Form.Control onChange={this.fileOnChange} type="file"  />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.addFormSubmit} type="submit">
                                Save
                            </Button>
                            <Button variant="secondary" onClick={this.addModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal size="lg" show={this.state.EditNewModal} onHide={this.editModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.updateFormSubmit}>
                                
                                <Form.Group className="mb-3" >
                                    <Form.Label>Review Title</Form.Label>
                                    <Form.Control onChange={this.handleInput} name="title" value={this.state.editTitle} type="text"  />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.handleInput} name="des" value={this.state.editDes} type="text"  />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Review Image</Form.Label>
                                    <Form.Control onChange={this.handleInput} name="file" value={this.editFile} type="file"  />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.updateFormSubmit} type="submit">
                                Update
                            </Button>
                            <Button variant="secondary" onClick={this.editModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
            );
        }
    }
}

export default ClientReviewPage;