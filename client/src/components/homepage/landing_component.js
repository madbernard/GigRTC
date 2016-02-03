import React , {Component} from 'react';
import {connect} from 'react-redux';
import {getActivePerformances} from '../../actions';

export class LandingComponent extends Component{

    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.getActivePerformances()
    }

    render(){
        return(<div>
                    <ul>
                        {this.renderEvents()}
                    </ul>
                </div>
        )
    }

    renderEvents(){
        return this.props.data.map((activeStreams)=> {
            return (
                <li className="list-group-item" key={activeStreams.id}>
                    <Link to={`activeStream/${activeStreams.id}`}>

                    </Link>
                </li>
            )
        })
    }


}

function mapStateToProps(state){
    return {
        data : state.data.activeStreams
    }
}

const mapDispatchToProps = {
    getActivePerformances
};

export default connect(mapStateToProps,mapDispatchToProps)(LandingComponent)