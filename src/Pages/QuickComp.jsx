import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { DataComp } from "../Component/DataComp";
import TextCard from "../Component/TextCard";
import {API_ROOT, webPath } from "../apiConfig";

export function QuickComp() {
  const [data, setData] = useState({
    quickData: [],
    articleData: []
  });

  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const dataCompWidth = isLargeScreen ? 500 : 200;

  const fetchData = useCallback(async () => {
    try {
      const [quickResponse, articleResponse] = await Promise.all([
        axios.get(`${API_ROOT}/api/post/homequickbyte`),
        axios.get(`${API_ROOT}/api/post/homearticle`),
      ]);

      const newData = {
        quickData: quickResponse.data,
        articleData: articleResponse.data,
      };

      setData(newData);
    
    

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const loadLocalData = useCallback(() => {
    const quickData = [];
    const articleData =  [];
    setData({ quickData, articleData });

  }, []);

  useEffect(() => {
    loadLocalData();
    fetchData();
  }, [loadLocalData, fetchData]);

  const renderQuickData = data?.quickData?.slice(1, 5).map((item) => (
    <div key={item.id}>
      <a className="a-tag" href={`/${item?.cat_slug}/${item?.post_name}`}>
        <TextCard
          title={item?.post_title}
          post_date={item?.post_date}
          post_author={item?.post_author}
        />
      </a>
    </div>
  ));

  const renderArticleData = data?.articleData?.slice(3)?.map((item) => (
    <div key={item?.id}>
      <a className="a-tag" href={`/${item?.cat_slug}/${item?.post_name}`}>
        <TextCard
          title={item?.post_title}
          post_date={item?.post_date}
          post_author={item?.post_author}
        />
      </a>
    </div>
  ));

  return (
    <>
      <div className="container mt-5 container-max">
        <div className="row">
          <h3 className="fw-bold borderB py-1 h4">Quick Bytes</h3>
          <div className="col-md-4 col-12 mt-3" style={{ borderRight: "1px solid #eaeaea" }}>
            {renderQuickData}
          </div>
          <div className="col-md-8 col-12 d-flex custom-space-between">
            <div className="mainSecondBox mt-3">
              <div className="row">
                {data?.quickData?.slice(4)?.map((item) => (
                  <div key={item.id} className="col-md-6">
                    <a className="a-tag" href={`/${item?.cat_slug}/${item?.post_name}`}>
                      <DataComp
                        src={`${webPath}${item?.banner_img}?width=${dataCompWidth}`}
                        alt={item?.post_name}
                        h2Title={item?.post_title}
                        p_Desc={item?.post_content}
                        post_author={item?.post_author}
                        post_date={item?.post_date}
                        withZoom={true}
                        loading="lazy"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 spaceincontent container-max">
        <div className="row">
          <h3 className="fw-bold borderB py-1 h4">Articles</h3>
          <div className="col-md-8 col-12 d-flex custom-space-between">
            <div className="mainSecondBox mt-3">
              <div className="row">
                {data?.articleData?.slice(1, 3)?.map((item) => (
                  <div key={item.id} className="col-md-6">
                    <a className="a-tag" href={`/${item?.cat_slug}/${item?.post_name}`}>
                      <DataComp
                        src={`${webPath}${item?.banner_img}?width=${dataCompWidth}`}
                        alt={item?.post_name}
                        h2Title={item?.post_title}
                        p_Desc={item?.post_content}
                        post_author={item?.post_author}
                        post_date={item?.post_date}
                        withZoom={true}
                        loading="lazy"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mt-3" style={{ borderLeft: "1px solid #eaeaea" }}>
            {renderArticleData}
          </div>
        </div>
      </div>
    </>
  );
}
