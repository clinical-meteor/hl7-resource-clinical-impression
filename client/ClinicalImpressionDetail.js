import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/clinical:alert';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import { get } from 'lodash';
import PropTypes from 'prop-types';

let defaultClinicalImpression = {
  'resourceType': 'ClinicalImpression',
  'status': 'unknown',
  'identifier': [{
    'use': 'official',
    'value': ''
  }],
  'code': {
    'text': ''
  }
};



Session.setDefault('clinicalImpressionUpsert', false);
Session.setDefault('selectedClinicalImpression', false);


export default class ClinicalImpressionDetail extends React.Component {
  getMeteorData() {
    let data = {
      clinicalImpressionId: false,
      clinicalImpression: defaultClinicalImpression,
      showDatePicker: false
    };

    if(this.props.showDatePicker){
      data.showDatePicker = this.props.showDatePicker
    }

    if (Session.get('clinicalImpressionUpsert')) {
      data.clinicalImpression = Session.get('clinicalImpressionUpsert');
    } else {
      // if (Session.get('selectedClinicalImpression')) {
      //   data.clinicalImpressionId = Session.get('selectedClinicalImpression');
        console.log("selectedClinicalImpression", Session.get('selectedClinicalImpression'));

        let selectedClinicalImpression = ClinicalImpressions.findOne({_id: Session.get('selectedClinicalImpression')});
        console.log("selectedClinicalImpression", selectedClinicalImpression);

        if (selectedClinicalImpression) {
          data.clinicalImpression = selectedClinicalImpression;
        }
      // } else {
      //   data.clinicalImpression = defaultClinicalImpression;
      // }
    }

    if (Session.get('selectedClinicalImpression')) {
      data.clinicalImpressionId = Session.get('selectedClinicalImpression');
    }      

    return data;
  }

  renderDatePicker(showDatePicker, datePickerValue){
    if (showDatePicker) {
      return (
        <DatePicker 
          name='performedDateTime'
          hintText="Performed Date/Time" 
          container="inline" 
          mode="landscape"
          value={ datePickerValue ? datePickerValue : ''}    
          onChange={ this.changeState.bind(this, 'performedDateTime')}      
          />
      );
    }
  }

  render() {
    return (
      <div id={this.props.id} className="clinicalImpressionDetail">
        <CardText>
        <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'
            value={ get(this, 'data.clinicalImpression.identifier[0].value') ? get(this, 'data.clinicalImpression.identifier[0].value') : ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>
          <TextField
            id='codeInput'
            ref='code'
            name='code'
            floatingLabelText='Code'
            value={this.data.clinicalImpression.code ? this.data.clinicalImpression.code.text : ''}
            onChange={ this.changeState.bind(this, 'code')}
            fullWidth
            /><br/>
          <TextField
            id='statusInput'
            ref='status'
            name='status'
            floatingLabelText='Status'
            value={this.data.clinicalImpression.status ? this.data.clinicalImpression.status : ''}
            onChange={ this.changeState.bind(this, 'status')}
            fullWidth
            /><br/>


            <br/>
          { this.renderDatePicker(this.data.showDatePicker, get(this, 'data.clinicalImpression.performedDateTime') ) }
          <br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.clinicalImpressionId) }
        </CardActions>
      </div>
    );
  }


  addToContinuityOfCareDoc(){
    console.log('addToContinuityOfCareDoc', Session.get('clinicalImpressionUpsert'));

    var clinicalImpressionUpsert = Session.get('clinicalImpressionUpsert');

    var newClinicalImpression = {
      'resourceType': 'ClinicalImpression',
      'status': clinicalImpressionUpsert.status,
      'identifier': clinicalImpressionUpsert.identifier,
      'code': {
        'text': clinicalImpressionUpsert.code.text
      },
      'performedDateTime': clinicalImpressionUpsert.performedDateTime  
    }

    console.log('Lets write this to the profile... ', newClinicalImpression);

    Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {
      'profile.continuityOfCare.clinicalImpressions': newClinicalImpression
    }}, function(error, result){
      if(error){
        console.log('error', error);
      }
      if(result){
        browserHistory.push('/continuity-of-care');
      }
    });
  }
  determineButtons(clinicalImpressionId){
    if (clinicalImpressionId) {
      return (
        <div>
          <RaisedButton id="saveClinicalImpressionButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteClinicalImpressionButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />

          <RaisedButton id="addClinicalImpressionToContinuityCareDoc" label="Add to CCD" primary={true} onClick={this.addToContinuityOfCareDoc.bind(this)} style={{float: 'right'}} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveClinicalImpressionButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let clinicalImpressionUpdate;

    if(process.env.NODE_ENV === "test") console.log("ClinicalImpressionDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new clinicalImpression
    if (Session.get('clinicalImpressionUpsert')) {
      clinicalImpressionUpdate = Session.get('clinicalImpressionUpsert');
    } else {
      clinicalImpressionUpdate = defaultClinicalImpression;
    }



    // if there's an existing clinicalImpression, use them
    if (Session.get('selectedClinicalImpression')) {
      clinicalImpressionUpdate = this.data.clinicalImpression;
    }

    switch (field) {
      case "identifier":
        clinicalImpressionUpdate.identifier = [{
          use: 'official',
          value: value
        }];
        break;
      case "code":
        clinicalImpressionUpdate.code.text = value;
        break;
      case "status":
        clinicalImpressionUpdate.status = value;
        break;
      case "performedDateTime":
        clinicalImpressionUpdate.performedDateTime = value;
        break;

      default:
    }

    if(process.env.NODE_ENV === "test") console.log("clinicalImpressionUpdate", clinicalImpressionUpdate);
    Session.set('clinicalImpressionUpsert', clinicalImpressionUpdate);
  }

  handleSaveButton(){
    let clinicalImpressionUpdate = Session.get('clinicalImpressionUpsert', clinicalImpressionUpdate);

    if(process.env.NODE_ENV === "test") console.log("clinicalImpressionUpdate", clinicalImpressionUpdate);


    if (Session.get('selectedClinicalImpression')) {
      if(process.env.NODE_ENV === "test") console.log("Updating clinicalImpression...");
      delete clinicalImpressionUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      clinicalImpressionUpdate.resourceType = 'ClinicalImpression';

      ClinicalImpressions.update(
        {_id: Session.get('selectedClinicalImpression')}, {$set: clinicalImpressionUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "ClinicalImpressions", recordId: Session.get('selectedClinicalImpression')});
            Session.set('clinicalImpressionPageTabIndex', 1);
            Session.set('selectedClinicalImpression', false);
            Session.set('clinicalImpressionUpsert', false);
            Bert.alert('ClinicalImpression updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new clinicalImpression", clinicalImpressionUpdate);

      ClinicalImpressions.insert(clinicalImpressionUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "ClinicalImpressions", recordId: result});
          Session.set('clinicalImpressionPageTabIndex', 1);
          Session.set('selectedClinicalImpression', false);
          Session.set('clinicalImpressionUpsert', false);
          Bert.alert('ClinicalImpression added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('clinicalImpressionPageTabIndex', 1);
  }

  handleDeleteButton(){
    ClinicalImpression.remove({_id: Session.get('selectedClinicalImpression')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "ClinicalImpressions", recordId: Session.get('selectedClinicalImpression')});
        Session.set('clinicalImpressionPageTabIndex', 1);
        Session.set('selectedClinicalImpression', false);
        Session.set('clinicalImpressionUpsert', false);
        Bert.alert('ClinicalImpression removed!', 'success');
      }
    });
  }
}


ClinicalImpressionDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(ClinicalImpressionDetail.prototype, ReactMeteorData);