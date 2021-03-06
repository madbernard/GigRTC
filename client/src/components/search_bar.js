import React,{Component,PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import {connect} from 'react-redux';
import _ from 'lodash';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Paper from 'material-ui/lib/paper';

const styles = {
    block: {
        maxWidth: '20%',
        margin : '0 auto'
    },
    radioButton: {
        marginBottom: 16
    }
};

var selected = "Artist";

export default class searchBar extends Component{

    constructor(props){
        super(props);
        this.state={
            search : ''
        }
    }


    render(){
        return (
            <Paper style={styles.block} zDepth={4}>

                <RadioButtonGroup name="shipSpeed" defaultSelected="Artist" >
                    <RadioButton
                        value="Genre"
                        label="Genre"
                        name = "Genre"
                        style={styles.radioButton}
                        onClick={this.selectedAttribute.bind(this,"Genre")}
                    />
                    <RadioButton
                        value="Artist"
                        label="Artist"
                        name = "Artist"
                        style={styles.radioButton}
                        onClick={this.selectedAttribute.bind(this,"Artist")}
                    />
                </RadioButtonGroup>
                <TextField
                    placeholder="Find your favourite artists"
                    value = {this.state.term}
                    onChange={this.onInputChange.bind(this)} />
            </Paper>
        )
    }
    onInputChange(event){
        this.setState({
            term : event.target.value
        });
        this.props.filterData({text : event.target.value, selected});

    }

    selectedAttribute(data){
        selected = data
    }
}
