// customDataProvider.js
import { 
    CreateParams,
    UpdateParams,
    DataProvider,
    fetchUtils } from 'react-admin';

import { stringify } from 'query-string';
import simpleRestProvider from 'ra-data-json-server';

const apiUrl=process.env.VITE_API_URL;
let createRequestInProgress=false

const refreshToken = async () => {
    try {
        const response = await fetch(`${apiUrl}/refresh-token`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.accessToken); // Save the new token
            return data.accessToken;
        } else {
            localStorage.removeItem('token');
            throw new Error('Unable to refresh token');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};




export const httpClient = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    console.log(token)
    const headers = new Headers();
    if (!options.headers) {
        headers.append( 'Content-Type', 'application/json' );
    }
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    if (options.headers && options.headers['Content-Type'] === 'application/x-www-form-urlencoded' && options.body) { 
        headers.append( 'Content-Type', 'application/x-www-form-urlencoded' );
        options.body = new URLSearchParams(options.body).toString();
    }
    
   console.log(headers.get("Authorization"))
    if(!token){
        
        refreshToken()

    }

    try {
        options.headers=headers
        const response = await fetchUtils.fetchJson(url, options);
        // Log the response for debugging purposes
       
        return response;
    } catch (error) {
        // Handle HTTP errors and log them
        if (error.status === 401 ) {
            try {
               
                
                const newToken = await refreshToken();
                headers.set('Authorization', `Bearer ${newToken}`);
                options.headers=headers
                const retryResponse = await fetchUtils.fetchJson(url, options);
                return retryResponse;
            } 
            catch (refreshError) {
               
                alert('Unauthorized: Please check your login credentials.');
                throw refreshError;
            }
        } else {
            throw error;
        }
    }
};






type PostParams = {
    brand: string;
    name: string;
    price: string;
    details?: Record<string, any>;
    category:string[],
    options:string,
    productImage: {
      rawFile: File;
      src?: string;
      title?: string;
    };
  };
  
  const createPostFormData = (
    params: CreateParams<PostParams> | UpdateParams<PostParams>
  ) => {
    
    const formData = new FormData();
    params.data.productImage?.rawFile && formData.append("file", params.data.productImage.rawFile);
    params.data.name && formData.append("name", params.data.name);
    params.data.brand && formData.append("brand", params.data.brand);
    params.data.price && formData.append("price", Number(params.data.price).toFixed(2));
   
    params.data.options && formData.append("options", params.data.options);
    if (params.data.category && params.data.category.length > 0) {
        params.data.category.forEach((cat, index) => {
            formData.append(`category[${index}]`, cat);
        });
    }
    if (params.data.Certifications) {
        params.data.Certifications.forEach((cert, index) => {
          formData.append(`details[Certifications][${index}]`, cert);
        });
      }
    
      if (params.data.dietaryRestrictions      ) {
        params.data.dietaryRestrictions.forEach((restriction, index) => {
          formData.append(`details[DietaryRestrictions][${index}]`, restriction);
        });
      }
    
      // Append other details
      if (params.data.details) {
        const details = params.data.details;
    
        // Handle other fields in details
        Object.entries(details).forEach(([key, value]) => {
          if (key !== 'Certifications' && key !== 'DietaryRestrictions') {
            if (value === undefined || value === null) {
              formData.append(`details[${key}]`, '');
            } else {
              formData.append(`details[${key}]`, value.toString());
            }
          }
        });
      }
    



   
    return formData
}



type BrandParams = {
    
    name: string;
    brandImage: {
        rawFile: File;
        src?: string;
        title?: string;
      };
    
   
  };
  
  const createBrandFormData = (
    params: CreateParams<BrandParams> | UpdateParams<BrandParams>
  ) => {
    const formData = new FormData();
   
    params.data.name && formData.append("name", params.data.name);
    params.data.brandImage?.rawFile && formData.append("file", params.data.brandImage.rawFile);
   
   


  
  
    return formData;
  };






  
type NewsParams = {
    newsTitle: string;
    newsContent: string;
    newsMainTag: string;
    newsImage: {
      rawFile: File;
      src?: string;
      title?: string;
    };
  };
  
  const createNewsFormData = (
    params: CreateParams<PostParams> | UpdateParams<PostParams>
  ) => {
    console.log(params.data)
    const formData = new FormData();
    params.data.newsImage?.rawFile && formData.append("file", params.data.newsImage.rawFile);
    params.data.newsTitle && formData.append("newsTitle", params.data.newsTitle);
    params.data.newsContent && formData.append("newsContent", params.data.newsContent);
    params.data.newsMainTag && formData.append("newsMainTag", params.data.newsMainTag);
    
    
     
    



   
    return formData
}















  const handleHttpError = (response) => {
    
    if (response.status === 401) {
        alert('Unauthorized: Please check your login credentials.');
        throw new Error('Unauthorized');
    }
    return response;
};









const customDataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}/show?${stringify(query)}`;
        
        return httpClient(url)
            .then(handleHttpError)
            .then(({ headers, json }) => ({
                data: json,
                total: parseInt(headers.get('X-Total-Count'), 10),
            }));
    },
    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/show/${params.id}`;
        return httpClient(url)
            .then(handleHttpError)
            .then(({ json }) => ({ data: json }));
    },
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url)
            .then(handleHttpError)
            .then(({ json }) => ({ data: json }));
    },
    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url)
            .then(handleHttpError)
            .then(({ headers, json }) => ({
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            }));
    },









    update: (resource, params) =>{

       console.log(params.data,resource)

        let headers={};
        let data;
        if(resource === 'products'){
            
           data= params.data
        }
        if(resource === 'news'){
           
           data= params.data
        }
        if(resource === 'brands'){
           
            data= params.data
         }
         if(resource === 'order'){
           
            data= params.data
         }

        
       return httpClient(`${apiUrl}/${resource}/id/${params.id}`, {
        method: 'PUT',
        headers:headers,
        body: data,
        
    })
        .then(handleHttpError)
        .then(({ json }) => ({ data: json }))},

















    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        })
            .then(handleHttpError)
            .then(({ json }) => ({ data: json }));
    },









        create: async (resource, params) => {
            if (createRequestInProgress) {
                console.log('Create request already in progress');
                return new Promise((resolve) => {
                    // Handle this situation based on your needs, e.g., reject or resolve immediately
                    resolve({ data: params.data });
                });
            }
    
            createRequestInProgress = true;
            let formData;
            if (resource === 'products') { 
                formData = createPostFormData(params);
            } else if (resource === 'brands') {
                formData = createBrandFormData(params);
            } else if(resource === 'news') {
                formData = createNewsFormData(params);
            }
    
            try {
                const response = await httpClient(`${apiUrl}/${resource}/create`, {
                    method: 'POST',
                    body: formData,
                });
                handleHttpError(response);
                const json = await response.json();
                return { data: { ...params.data, id: json.id } };
            } catch (error) {
                console.error('Error creating resource:', error);
                throw error;
            } finally {
                createRequestInProgress = false;
            }
        },
    delete: (resource, params) => httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
    })
        .then(handleHttpError)
        .then(({ json }) => ({ data: json })),
    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        })
            .then(handleHttpError)
            .then(({ json }) => ({ data: json }));
    },
};


  
export default customDataProvider;
