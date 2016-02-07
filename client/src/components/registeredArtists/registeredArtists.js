import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {fetchAllRegisteredArtists,getAllStreams} from '../../actions/index'
import { Link } from 'react-router';
import _ from 'lodash';

import SearchBar from '../search_bar'

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    searchBar : {
        margin: '0 auto'
    }
};

export class RegisteredArtists extends Component{

    constructor(props){
        super(props);
        this.state ={
            registeredArtists : null,
            allStreams : null
        }

    }

    componentWillMount(){
        this.props.fetchAllRegisteredArtists().then(function(data){
            this.setState({
                registeredArtists : data.payload.data.registeredArtists
            })
        }.bind(this))
        this.props.getAllStreams().then(function(info){
            this.setState({
                allStreams : info.payload.data
            })
        }.bind(this))
    }

    filterData(criteria){
        var results = _.filter(this.props.registeredArtists, function(artist) {
            if( criteria.selected === "Artist" ){
               return  artist.display_name == criteria.text
            }
            else if(criteria.selected === "Genre"){
                return  artist.genre == criteria.text
            }

        });
        this.setState({
            registeredArtists : results
        })
    }

    render () {

        if (this.state.registeredArtists) {
            return(
                <div>
                    <div style={ styles.searchBar }>
                        <SearchBar filterData={this.filterData.bind(this)}/>
                    </div>

                    <div style={ styles.root }>
                        <ul>
                            { this.renderEvents() }
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>All The Artists We Host!</div>
                </div>
            )
        }
    }

    renderEvents () {

        return this.state.registeredArtists.map((Artist)=> {
            var performanceProfile = _.find(this.props.allStreams,{room : Artist.user_name}) //This data's image will be used to fill up the banner for the tile, line 111

            return (
                <li key={Artist.id}>
                    <Link to={`/router/artistPage/${Artist.user_name}`}>
                        <Card>
                            <CardHeader
                                title={Artist.display_name}
                                avatar="http://lorempixel.com/100/100/nature/"
                            />
                            <CardMedia
                                overlay={<CardTitle title={Artist.genre}  />}
                            >
                                <img src={Artist.user_image} />
                            </CardMedia>
                            <CardTitle title="Hey there!" subtitle="I'm the OG " />
                            <CardText>
                                {Artist.brief_description}
                            </CardText>
                            <CardActions>
                                <FlatButton label="Subscribe to me" />
                                 <FlatButton
                                    onTouchTap={()=>browserHistory.push(`/router/artistPage/${Artist.user_name}`)}
                                    label="Come see me perform live!" />

                            </CardActions>
                        </Card>
                    </Link>
                </li>

            )
        })
    }
}


function mapStateToProps(state){

    return{
        registeredArtists : state.data.registeredArtists,
        allStreams : state.data.allStreams
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchAllRegisteredArtists,getAllStreams}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisteredArtists)
