import React, { useState } from 'react';
import './TopFold.css';
import { AiOutlineSearch, AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';

const TopFold = () => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [copyMessage, setCopyMessage] = useState(false);
    const [hideRightSide, setHideRightSide] = useState(false);

    const search = () => {
        if (!query) {
            setQuery(undefined);
            return;
        }
        fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=BmtB566w0OydIq0bCkSqjucVlqGb1hzi`)
        .then(response => response.json())
        .then(json => {

            setLoading(true);
            setHideRightSide(true);
            
            setTimeout(() => {
              setData(json.data);
              setLoading(false);
            }, 1500);
        });

        /* Consider switching to axios if fetch fails in some browsers... */
        // axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=BmtB566w0OydIq0bCkSqjucVlqGb1hzi`)
        // .then((response) => {
        //     setData(response.data.results);
        //     setTimeout(() => {
        //       setLoading(false);
        //     }, 1500)
        //     setMovies(response.data.results)
        // })
    };

    const handleCopyGIF = (gifURL) => {
        navigator.clipboard.writeText(gifURL);
        setTimeout(() => {
            setCopyMessage(false);
        }, 3000)
    };

  return (
    <div>
      <div className={hideRightSide === false ? "topfold-before absolute-center" : "topfold-after absolute-center" }>
        <div className='tf-left'>
          <div className='tf-heading'>
            <span>GIF Meme Finder</span>
          </div>
          { hideRightSide && (
            <div className='tf-r-bg-blob-search' />
          )}
          {
            hideRightSide === false ? (
              <div className='tf-description'>
                The leading GIF search engine home to millions of GIFs.
                Search, copy, and meme in seconds.
              </div>
            ) : (
              <div className='tf-description'>
                Search, copy, and meme in seconds.
              </div>
            )
          }
          <div>
            <form className={hideRightSide === false ? "search-box-before" : "search-box-after" } onSubmit={(ev) => {ev.preventDefault(); search()}}>
              <input className={hideRightSide === false ? "search-txt-before" : "search-txt-after"} placeholder='Search GIFs' value={query} onChange={e => setQuery(e.target.value)} />
              <div className="search-btn" onClick={(ev) => {ev.preventDefault(); search()}}>
                <AiOutlineSearch size={20} />
              </div>
              {
                hideRightSide && (
                  <div className="delete-btn" onClick={(ev) => {ev.preventDefault(); setData(""); setHideRightSide(false); setQuery("")}}>
                    <AiOutlineClose size={20} />
                  </div>
                )
              }
            </form>
          </div>
          {
            hideRightSide === false && (
              <div className='tf-left-infoStats'>
                <div className='tf-is-infoItem absolute-center'>
                  <div className='tf-infoItem-count'>2M+</div>
                  <div className='tf-infoItem-label'>GIFs</div>
                </div>
                <div className='tf-is-infoItem absolute-center'>
                  <div className='tf-infoItem-count'>20K+</div>
                  <div className='tf-infoItem-label'>Themes</div>
                </div>
                <div className='tf-is-infoItem absolute-center'>
                  <div className='tf-infoItem-count'>1K+</div>
                  <div className='tf-infoItem-label'>Searches per Day</div>
                </div>
              </div>
            )
          }
        </div>

        {
          hideRightSide === false && (
            <div className='tf-right'>
              <div className='tf-r-bg-blob' />
              <div className='tf-right-diamond'>
                <div className='tf-r-diamond-item absolute-center'>
                  <img 
                    className='tf-r-diamond-img' 
                    alt='diamond-banner' 
                    src="https://media0.giphy.com/media/WRQBXSCnEFJIuxktnw/200w.gif?cid=f3a10945ua6e5m2hcgh3ans3d6upkk8gzq7i9d8w4opua1mo&rid=200w.gif&ct=g" 
                  />
                </div>
                <div className='tf-r-diamond-item absolute-center'>
                  <img 
                    className='tf-r-diamond-img' 
                    alt='diamond-banner' 
                    src="https://media4.giphy.com/media/sDcfxFDozb3bO/200w.gif?cid=f3a10945pbud2dmf46muh7t97fekgkkjjqt839wwfk73c53t&rid=200w.gif&ct=g" 
                  />
                </div>
                <div className='tf-r-diamond-item absolute-center'>
                  <img 
                    className='tf-r-diamond-img' 
                    alt='diamond-banner' 
                    src="https://media0.giphy.com/media/UKF08uKqWch0Y/200w.gif?cid=f3a10945iamjtssla9fe662ryhvxbpvb9q25d9nv0m4mdb6n&rid=200w.gif&ct=g" 
                  />
                </div>
                <div className='tf-r-diamond-item absolute-center'>
                  <img 
                    className='tf-r-diamond-img' 
                    alt='diamond-banner' 
                    src="https://media4.giphy.com/media/MWSRkVoNaC30A/200w.gif?cid=f3a10945lhsf4oj7jgtndyhg3863wbgnoj8d3dx9a24ea06m&rid=200w.gif&ct=g" 
                  />
                </div>
              </div>
            </div>
          )
        }
      </div>
      {
          loading ? (
            <div className="loading-scrn"><div></div><div></div><div></div></div>
          ) : (
            data && (
              <div className="main">
                <h1>{data.length} Results</h1>
                <div className="listing">
                  <ul>
                    {data.map(d => (
                      <li className='image-listing' key={d.id}>
                        <img className='img-listing-item' src={d.images.fixed_width.url} alt={d.id} />
                        <span className="copy-btn" onClick={(ev) =>  { setCopyMessage(true); handleCopyGIF(d.images.fixed_width.url) }}>
                          <FiCopy size={20} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          )
        }

        {
          copyMessage && (
              <div className="confirm-mssg">
                  <div className="confirm-mssg-text">
                      <AiFillCheckCircle size={27} style={{ margin: "6px", alignItems: 'center', justifyContent: "center" }} />
                      <div >GIF Copied!</div>
                  </div>
              </div>
          )
        }
    </div>
  )
}

export default TopFold