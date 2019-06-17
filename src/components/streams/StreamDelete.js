import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import history from '../../history';
import { fetchStream,deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    renderAction() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment >
                <button onClick={() => this.props.deleteStream(id)}className="ui button negative">Delete</button>
                <Link to="/"className="ui button ">Cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading ...</div>;
        }
        return (
            <div>
                StreamDelete
                < Modal title="Delete Stream"
                    content="Do you want to delete this stream"
                    actions={this.renderAction()}
                    onDismiss={() => history.push('/')} />
            </div >);
    }


};
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);