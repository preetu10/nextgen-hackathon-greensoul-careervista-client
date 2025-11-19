
const API_BASE_URL = 'http://localhost:5000/api';


export const jobAPI = {

  getAllJobs: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${API_BASE_URL}/jobs${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch jobs');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },


  getJobById: async (jobId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch job');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },


  getRecommendedJobs: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/recommended/${userId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch recommended jobs');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
      throw error;
    }
  },

 
  getSkillGapAnalysis: async (userId, jobId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/skill-gap/${userId}/${jobId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch skill gap analysis');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching skill gap analysis:', error);
      throw error;
    }
  },


  addJob: async (jobData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add job');
      }
      
      return data;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  },

  
  seedJobs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/seed`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to seed jobs');
      }
      
      return data;
    } catch (error) {
      console.error('Error seeding jobs:', error);
      throw error;
    }
  },
};


export default {
  job: jobAPI,
};