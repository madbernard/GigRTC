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
                // <li className="list-group-item" key={activeStreams.id}>
                //     <Link to={`activeStream/${activeStreams.id}`}>

                //     </Link>
                // </li>
                <div style={styles.root}>
                  <GridList
                    cellHeight={180}
                    style={styles.gridList}
                  >
                    {tilesData.map(tile => (
                      <GridTile
                        key={tile.title}
                        title={tile.title}
                        subtitle={<span>by <b>{tile.author}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                      >
                        <img src={tile.img} />
                      </GridTile>
                    ))}
                  </GridList>
                </div>
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
