import React, {Component} from 'react' ;
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent ,axios) => {
    return class extends Component{
        state = {
            error : null
        }
        //according  to life cycle method we should use componentwill mount at the place of did mount bcoz we always call or render the child components then we will render component did mount
        componentWillMount() {

            axios.interceptors.request.use( req => {
                this.setState({ error : null});
                return req ;
            
            });
            
            axios.interceptors.response.use(res => res , error => {
                this.setState({error : error });
            });
        }
        errorConfirmedHandler = () => {
            this.setState({error : null}); 
        }

        render(){
            return(
                <Aux>
                <Modal show = {this.state.error} modalClosed= {this.errorConfirmedHandler}>
                {this.state.error ? this.state.error.message : null }
                </Modal>
                <WrappedComponent {...this.props}/>
            </Aux>

            );
        }
    }  
}

export default withErrorHandler ;