import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import ClinicalImpressionDetail from './ClinicalImpressionDetail';
import ClinicalImpressionsTable from './ClinicalImpressionsTable';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

export class ClinicalImpressionsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('clinicalImpressionPageTabIndex'),
      clinicalImpressionSearchFilter: Session.get('clinicalImpressionSearchFilter'),
      currentClinicalImpression: Session.get('selectedClinicalImpression')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('clinicalImpressionPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedClinicalImpression', false);
    Session.set('clinicalImpressionUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In ClinicalImpressionsPage render');
    return (
      <div id='clinicalImpressionsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='ClinicalImpressions' />
            <CardText>
              <Tabs id="clinicalImpressionsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newClinicalImpressionTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <ClinicalImpressionDetail id='newClinicalImpression' />
               </Tab>
               <Tab className="clinicalImpressionListTab" label='ClinicalImpressions' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <ClinicalImpressionsTable />
               </Tab>
               <Tab className="clinicalImpressionDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <ClinicalImpressionDetail 
                  id='clinicalImpressionDetails'
                  showDatePicker={true} 
                 />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(ClinicalImpressionsPage.prototype, ReactMeteorData);

export default ClinicalImpressionsPage;