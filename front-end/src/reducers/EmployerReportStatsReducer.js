import { updateEmployerStats, updateCompanyDemographics } from '../constants/action-types';

const defaultState = {
  reportStore: {
    statsList: [],
    PageNo: 0,
    PageCount: 5,
    Totalcount: 10,    
  },  
  demographicsStore: {
    demographics: {}
  }
};

const EmployerReportStatsReducer = (state = defaultState, action) => {  
  switch (action.type) {
    case updateEmployerStats: {     
      return {       
        ...state,
        reportStore: { ...state.reportStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }   
    case updateCompanyDemographics: {     
      return {       
        ...state,
        demographicsStore: { ...state.demographicsStore, ...action.payload1 },
        //   return Object.assign(state, action.payload);
      };
    }   

    default: {
      return { ...state };
    }
  }
};

export default EmployerReportStatsReducer;
