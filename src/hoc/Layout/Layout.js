import React,{Component} from 'react';
import Aux from  '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component{
    state = {
        showSideDrawer : false  //true also we can put
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer : false});

    }
    sideDrawerToggleHandler = () => {
        //in this we cant use directly this.state in useState
        this.setState((prevState) =>{
            return { showSideDrawer : !prevState.showSideDrawer};
        })
    }
    render(){
        return(
            <Aux >
            <Toolbar sideDrawerToggle = {this.sideDrawerToggleHandler} />
            <SideDrawer 
            open = {this.state.showSideDrawer}
            closed = {this.sideDrawerCloseHandler} />
            <main className = {classes.Content} >
                {this.props.children}
            </main>
                
            </Aux>

        );
    }
}

export default Layout ;

// const layout = (props) => {
//     return(
//         <Aux >
//         <Toolbar />
//         <SideDrawer />
//         <main className = {classes.Content} >
//             {props.children}
//         </main>
            
//         </Aux>

//     );




// }
//we convert this into class based component for managing some state
