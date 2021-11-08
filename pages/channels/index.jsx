import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { Context } from "../../context";
import { FaLockOpen, FaLock } from "react-icons/fa";
import Loading from "../../components/Loading";

function ChannelList() {
  const { API_URL, API_TOKEN } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(`${API_URL}/channels`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTdjYjg3MzVjMWI2YjJlZWRiNGIxYTIwNjczM2YwMWMxMjQzZWNhN2MwNDc0MjY2MDdlNTQyMmQ4NTUzNDU5OGY3M2YyNDcwMjBkNTM0YzgiLCJpYXQiOjE2MzYyODY1NjIuMjA2OTMsIm5iZiI6MTYzNjI4NjU2Mi4yMDY5MzUsImV4cCI6MTY2NzgyMjU2Mi4xNDQzMDEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.P5et0vGAIRbOODn_s2RAV7LUsfcTnEwz7jLy2clwSyccx3F0aDQONDkjXfGlKgVuAqd51N9dfqxj270lnhkvmhdUZToJaHHMseJzbcFHiHBi03onLQsaR7j46IMBeN5JHCdVJ_mq-5XFGF0jPXSNt1Ryog76yEGQHp9A1nKV0s8Ylp0Skyb8r-Lw075l2iOktb1Jbm9UGkDC46BJFBwYEDiGyDcjUq2f72RQGILdRef47t5JJkgznT6SFokQEGwQPg76U_mXo0Y_YM8d4MEcUqPIyAH6djn7zNN3aASx4s-coo5tCDaFPVn24QTx5YL1cfWIXO2MyBDQ5R5Qof0OColFJyWRYEdwrfe0DU16W0IabR4smRZ2p00oe5jsns32Dx36tdqh1WJX22-T5gc-mY6AXvdOL-vxVO77W-JJEnibdnD1XIUUV8XxNipjZZVmA6fb94GGkbv8gyLjMqVyUtjCIafLq5g3tvw5uP30E5pxxdnl-QT4Mg11sMx9pxja0z7bCu69XV8gZSdmBqrFxMscHIrcLrNNAFos-JDTJTd0Omz0zavcHjntK2HzwhJ_g0o9A0TTTdttqT7PyMlkKY7kzGHzjhsmZpn9U4dSQfJp5cO_sUkULrMszLk70DYnp74zwL9Ztx5TwPMOgHSxbHVXqOScbgjHFJPkRlHurdA",
          },
        })
        .then((response) => {
          setChannels(response.data.channels);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <Loading></Loading>}
      {channels && (
        <>
          <h1>Channels</h1>

          <ul>
            {channels.map((channel) => {
              return (
                <li key={channel.id}>
                  <Link href={`/channels/${channel.id}`}>
                    <a>
                      <strong>
                        {" "}
                        {channel.is_password_protected ? (
                          <FaLock />
                        ) : (
                          <FaLockOpen />
                        )}{" "}
                        {channel.name}
                      </strong>
                    </a>
                  </Link>
                  <em> by </em>
                  <Link href={`/users/${channel.user.id}`}>
                    <a>
                      <strong>{channel.user.name}</strong>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default ChannelList;
