import React from 'react';


const NotFound = () => {
  return (
    <div>
      
      <div className="container container-max">
        <div className="row">
          <div className="col-md-12 mt-3 notfound">
            <h1 className="fw-bold">Error 404 - Not Found</h1>
            <p>The page you are looking for can't be found. Go back or browse our recent articles.</p>
            <div className="mt-4 mb-4">
              <a href="/" className="hoverHead text-black goBack">
                Go Back Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotFound);