

import ClinicalImpressionsPage from './client/ClinicalImpressionsPage';
import ClinicalImpressionsTable from './client/ClinicalImpressionsTable';

var DynamicRoutes = [{
  'name': 'ClinicalImpressionsPage',
  'path': '/clinical-impressions',
  'component': ClinicalImpressionsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'ClinicalImpressions',
  'to': '/clinical-impressions',
  'href': '/clinical-impressions'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  ClinicalImpressionsPage,
  ClinicalImpressionsTable
};


