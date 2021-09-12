import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Col,Button,Modal, Container, Row, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Menu from '../components/Menu';
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import ReactQuill from 'react-quill';

class ProjectPage extends Component {
    constructor(){
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            selectedRowId:"",
            deleteBtnText:"Delete",
            addBtnText:"Add New",
            addNewModal:false,
            addName:"",
            addDes:"",
            addFeature:"",
            addLink:"",
            addImageOne:"",
            addImageTwo:""
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.ImgCellFormat=this.ImgCellFormat.bind(this);
        this.addModalOpen=this.addModalOpen.bind(this);
        this.addModalClose=this.addModalClose.bind(this);

        this.onNameChange=this.onNameChange.bind(this);
        this.onDesChange=this.onDesChange.bind(this);
        this.onFeatureChange=this.onFeatureChange.bind(this);
        this.onLinkChange=this.onLinkChange.bind(this);
        this.onImageOneChange=this.onImageOneChange.bind(this);
        this.onImageTwoChange=this.onImageTwoChange.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);
    }
   
    addModalOpen(){
        this.setState({AddNewModal:true})
    }

    addModalClose(){
        this.setState({AddNewModal:false})
    }

    onNameChange(event){
        let name=  event.target.value;
        this.setState({addName:name})
  
    }
  
    onDesChange(event){
        let des=  event.target.value;
        this.setState({addDes:des})
  
    }
  
    onFeatureChange(content, delta, source, editor){
        let feature=  editor.getHTML();
        this.setState({addFeature:feature})
  
    }

    onLinkChange(event){
        let link=  event.target.value;
        this.setState({addLink:link})

    }

    onImageOneChange(event){
        let photoOne=event.target.files[0];
        this.setState({addImageOne:photoOne})

    }

    onImageTwoChange(event){
        let photoTwo=event.target.files[0];
        this.setState({addImageTwo:photoTwo})

    }


    addFormSubmit(event){
        let name=this.state.addName;
        let des=this.state.addDes;
        let feature=this.state.addFeature;
        let link=this.state.addLink;
        let photoOne=this.state.addImageOne;
        let photoTwo=this.state.addImageTwo;

        let myFormData=new FormData();
        myFormData.append('name',name);
        myFormData.append('des',des);
        myFormData.append('feature',feature);
        myFormData.append('link',link);
        myFormData.append('photoOne',photoOne);
        myFormData.append('photoTwo',photoTwo);

        let Url="/AddProject";

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
        axios.get('/ProjectList').then((response)=>{
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
        axios.post('/ProjectDelete',{id:this.state.selectedRowId}).then((response)=>{
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

    ImgCellFormat(cell,row){
        return(
            <img className="table-cell-img" src={cell}/>
        )
    }
    render() {
        if (this.state.isLoading===true) {
            return(
                <Menu title="Project">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        } else if (this.state.isError===true) {
            return(
                <Menu title="Project">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{
            
        
            const data = this.state.dataList;
            const columns=[
                {dataField: 'id', text: 'ID'},
                {dataField: 'img_one', text: 'Image One', formatter:this.ImgCellFormat},
                {dataField: 'project_name', text: 'Project Name'},
                {dataField: 'short_description', text: 'Short Description'},
                {dataField: 'live_preview', text: 'Live Preview'},
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
                    <Menu title="Project">
                        <Container>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                <button onClick={this.dataDelete} className="normal-btn  btn">{this.state.deleteBtnText}</button>
                                <button onClick={this.addModalOpen} className="normal-btn ms-2 btn">Add New</button>
                                <BootstrapTable keyField='id' data={ data } selectRow={selectRow} columns={ columns } pagination={ paginationFactory() } striped hover condensed />
                                </Col>
                            </Row>
                        </Container>
                    </Menu>


                    <Modal size="lg" scrollable={true} show={this.state.AddNewModal} onHide={this.addModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control onChange={this.onNameChange}  type="text" placeholder="Project Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control onChange={this.onDesChange} type="text" placeholder="Short Description" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Project Features</Form.Label>
                                    <ReactQuill onChange={this.onFeatureChange} theme="snow" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Project Link</Form.Label>
                                    <Form.Control onChange={this.onLinkChange}  type="text" placeholder="Project Link" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Project Card Image</Form.Label>
                                    <Form.Control onChange={this.onImageOneChange} type="file"  />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Feature Image</Form.Label>
                                    <Form.Control onChange={this.onImageTwoChange} type="file"  />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.addFormSubmit} variant="primary">
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

export default ProjectPage;