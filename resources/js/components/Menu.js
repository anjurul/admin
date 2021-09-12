import React, { Component, Fragment } from 'react';
import { faBars, faBookOpen, faCode, faComment, faEnvelope, faFolder, faHome, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor(props){
        super();
        this.state={
            sideNav:false,
            navText:"navText",
            sideNavClass:"sidenavClose",
            mainDivOverlay:"main-overlay-close"
        }
        this.showHideSideNav=this.showHideSideNav.bind(this);
    }
    showHideSideNav(){
        if(this.state.sideNav===false){
            this.setState({sideNav:true,navText:"navTextOpen",sideNavClass:"sidenavOpen",mainDivOverlay:"main-overlay-open"})
        }
        else {
            this.setState({sideNav:false,navText:"d-none",sideNavClass:"sidenavClose",mainDivOverlay:"main-overlay-close"})
        }
    }
    render() {
        return (
            <Fragment>
                <title>{this.props.title}</title>
                <Navbar  expand="lg" className="fixed-top ps-5" variant="light" bg="light">
                    <Navbar.Brand onClick={this.showHideSideNav} href="#"><FontAwesomeIcon icon={faBars}/></Navbar.Brand>
                </Navbar>
                <div className={this.state.sideNavClass}>
                    <NavLink><Link className="NavItem" to="/"><FontAwesomeIcon icon={faHome}/><span className={this.state.navText}>Home</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/contact"><FontAwesomeIcon icon={faEnvelope}/><span className={this.state.navText}>Contact</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/course"><FontAwesomeIcon icon={faBookOpen}/><span className={this.state.navText}>Course</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/project"><FontAwesomeIcon icon={faCode}/><span className={this.state.navText}>Project</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/service"><FontAwesomeIcon icon={faFolder}/><span className={this.state.navText}>Service</span></Link></NavLink>
                    <NavLink><Link className="NavItem" to="/review"><FontAwesomeIcon icon={faComment}/><span className={this.state.navText}>Review</span></Link></NavLink>
                    <a className=" ms-3 NavItem" href="/Logout"><FontAwesomeIcon icon={faPowerOff}/><span className={this.state.navText}>Log Out</span></a>
                </div>
                
                <div onClick={this.showHideSideNav} className={this.state.mainDivOverlay}>

                </div>
                <div className="mainDiv">
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Menu;