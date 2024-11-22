import React from 'react'
import { useState, useEffect } from 'react'
import Homepage from './Homepage'
import { GuestComp } from './GuestComp'
import { QuickComp } from './QuickComp'
import PodcastComp from './PodcastComp'
import { API_ROOT, webPath } from '../apiConfig'
import axios from 'axios'

function MainPageComp() {

  const [advertisementData, setAdvertisementData] = useState([]);

  useEffect(() => {
    const fetchAdvertisementData = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/api/advertisement/get_active`);
        setAdvertisementData(response.data);

      } catch (error) {
        console.error('Error fetching advertisement data:', error);
      }
    };

    fetchAdvertisementData();
  }, []);

  return (
    <>


      <Homepage />

      <GuestComp />

      <QuickComp />

      <PodcastComp />


      <div className="container container-max ">
        <div className="row mt-2 spaceincontentbottm">
          <div className="col-md-12 mb-2 borderB">
            <div >
              {advertisementData && advertisementData.length > 0 && (
                <a href={`${advertisementData[2]?.dest_url}`}> <img
                  style={{ width: "100%", height: "auto" }}
                  src={`${webPath}/${advertisementData[2]?.banner_img}`}
                  alt={advertisementData[2]?.banner_name} aria-label={advertisementData[2]?.banner_name}
                  loading="lazy" width="640" height="360" /> </a>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default MainPageComp

