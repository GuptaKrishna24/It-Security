import React from "react";

import MainPageComp from "./MainPageComp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TagPageComp from "./TagPageComp";
import ContentCategory from "./ContentCategory";
import Topic from "./Topic";
import About from "./About";
import Privacy from "./Privacy";
import Donotsell from "./DoNotSell";
import NotFound from "../Component/NotFound";
import Contact from "./Contact";
import PostPreview from "./PostPreview";
import { SearchList } from "./Searchlist";
import Sitemap from "./Sitemap";
import AuthorPage from "./AuthorPage";
import Eventpage from "./Event";
import EventDetail from "./EventDetail";
import PastEvent from "./PastEvent";
import PastEventDetail from "./PastEventDetail";

const MainRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageComp />}></Route>
          <Route path="/tag/:subcat" element={<TagPageComp />} />
          <Route path="/:cat_slug/:post_name" element={<Topic />} />

          {/* Krishna */}

          <Route path="/author/:auther_name" element={<AuthorPage />} />

          <Route path="/events" element={<Eventpage />} />
          <Route path="/events/:event_slug" element={<EventDetail />} />
          <Route
            path="/past-events/:event_slug"
            element={<PastEventDetail />}
          />
          <Route path="/past-events" element={<PastEvent />} />
          <Route path="/past-events/:event_slug" element={<EventDetail />} />
          {/* Krishna */}
          <Route path="/topic/:cat_slug" element={<ContentCategory />}></Route>
          <Route
            path="/topic/:cat_slug/:subcat"
            element={<ContentCategory />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/privacy-policy" element={<Privacy />}></Route>
          <Route path="/opt-out-form" element={<Donotsell />}></Route>

          <Route
            exact
            path="/search/:cat/:searchVal"
            element={<SearchList />}
          />

          <Route path="/about" element={<About />}></Route>

          <Route path="/opt-out-form" element={<Donotsell />}></Route>
          <Route path="/contact-us" element={<Contact />}></Route>
          <Route
            path="/preview/:cat_slug/:post_name"
            element={<PostPreview />}
          ></Route>
          <Route path="/sitemap" element={<Sitemap />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
