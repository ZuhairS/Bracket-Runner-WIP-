import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
  TextInput,
  ScrollView,
} from 'react-native';

//imported components
import AlertContainer from '../alerts/alert_container';
import { Field, reduxForm } from 'redux-form';
import { editBracket } from '../../actions/bracket_actions';
// import SetResultsCounter from './set_results_counter';


// this.props.state.bracket.selectedBracket.matches[this.props.navigation.state.params.match].player1Score
// this.props.state.bracket.selectedBracket.matches[this.props.navigation.state.params.match].player2Score

ResultForm = class ResultForm extends Component {
  constructor(props) {
    super(props);

    this.onReportResult = this.onReportResult.bind(this);
  }

  onReportResult(values){
    this.props.editBracket(values).then(() => {
    this.props.reset();
    }).then(() =>{
      this.props.navigation.navigate('BracketDetail');
    });
  }

  render() {

    const matchNum = this.props.navigation.state.params.match + 1

    return (
      <View style={styles.container}>
        <Text style={styles.pageHeader}>Input Results</Text>
        <ScrollView>
          <View style={styles.matchContainer}>
            <Text style={styles.matchHeader}>Match {matchNum}</Text>
            <View style={styles.fieldContainer}>
              <View>
                <Text style={styles.fieldTitle}>P1</Text>
                <Field name="player1_result" component={renderInput} />
              </View>
              <View>
                <Text style={styles.fieldTitle}>P2</Text>
                <Field name="player2_result" component={renderInput} />
              </View>
            </View>
            <TouchableOpacity onPress={this.props.handleSubmit(this.onReportResult)}>
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </View>
          <AlertContainer />
        </ScrollView>
      </View>

    );
  }

}

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput style={styles.input} onChangeText={onChange} {...restInput} />
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderRightWidth: 5,

  },
  pageHeader: {
    color: 'yellow',
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 30,
  },
  matchContainer: {
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderColor: 'yellow',
    height: 160,
    width: 300,
    marginBottom: 20,

  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,

  },
  fieldTitle:{
    color: 'yellow',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    color: '#333',
    backgroundColor: 'white',
    borderColor: 'yellow',
    borderRadius: 5,
    textAlign: 'center',
    padding: 5,
    height: 30,
    width: 50,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 16,
  },
  inputs: {
    color: 'white',
    borderColor: 'yellow',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    height: 74,
    width: 250,

  },
  button: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 5,
    fontWeight: 'bold',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 100,
    alignSelf: 'center',
    fontSize: 14,

  },
})

const mapStateToProps = (state) => {
  return {
    state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editBracket: bracket => dispatch(editBracket(bracket))
  };
};

const validate = (formProps) => {
  var errors = {};
  return errors;
}

ResultForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultForm);

export default reduxForm({
  form: 'result_form',
  fields: ['player1_result', 'player2_result'],
  validate: validate
})(ResultForm)