import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './utils/Loader';
import './App.css'
import Connect from './Connect';

const App = () => {
  const [login, setLogin] = useState(false)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeAwait = (time) => {
    setTimeout(() => {
      setLoading(false);
    }, time);
  }
  const dataFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://data.covid19india.org/data.json');
      console.log(res);
      if (!res) {
        throw new Error(res.message);
      }
      setData(res.data.statewise);
    } catch (err) {
      console.log('data not fetch', err);
    }
    timeAwait(2000);
  }
  useEffect(() => {
    dataFetch();
  }, [login])

  return (
    <>
      {!login ? (
        <Connect login={login} setLogin={setLogin} />
      ) : (
        <div>
          {
            loading ? (
              <div className='loader'>
                <p>Loading...</p>
                <div>
                  <Loader />
                </div>
              </div>
            )
              :
              (
                <div>
                  <center>
                    <h1>INDIA COVID-19 DASHBOARD</h1>
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th>State</th>
                          <th>Confirmed</th>
                          <th>Recovered</th>
                          <th>Deaths</th>
                          <th>Active</th>
                          <th>LastUpdate</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.state}</td>
                              <td>{item.confirmed}</td>
                              <td>{item.recovered}</td>
                              <td>{item.deaths}</td>
                              <td>{item.active}</td>
                              <td>{item.lastupdatedtime}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </center>
                  <button
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-5'
                    onClick={() => {
                      setLogin(false)
                    }}
                  >
                    logout
                  </button>
                </div>

              )
          }


        </div>
      )
      }
    </>
  )
}

export default App
