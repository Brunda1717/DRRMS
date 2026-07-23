import React, { useEffect, useState } from "react";
import axios from "axios";

function MyDonations() {

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchMyDonations();

    const interval = setInterval(() => {
      fetchMyDonations();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchMyDonations = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/donations/mydonations/1"
      );

      setDonations(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deliveredCount = donations.filter(
    d => d.status === "delivered"
  ).length;

  const totalPeopleHelped = deliveredCount * 12;

  return (

    <div style={styles.page}>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Audiowide&display=swap');

        *{
          font-family:'Outfit',sans-serif;
        }

        body{
          margin:0;
          padding:0;
          background:#05010d;
          overflow-x:hidden;
        }

        /* BACKGROUND */

        .bg{
          position:fixed;
          inset:0;
          background:
          linear-gradient(rgba(5,0,15,0.88),rgba(5,0,15,0.92)),
          url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop');
          background-size:cover;
          background-position:center;
          z-index:-5;
          animation:bgZoom 18s ease-in-out infinite alternate;
        }

        @keyframes bgZoom{
          from{
            transform:scale(1);
          }
          to{
            transform:scale(1.08);
          }
        }

        /* FLOATING GLOW BALLS */

        .orb{
          position:fixed;
          border-radius:50%;
          filter:blur(80px);
          opacity:0.45;
          z-index:-2;
          animation:float 12s ease-in-out infinite;
        }

        .orb1{
          width:300px;
          height:300px;
          background:#ff00ff;
          top:-100px;
          left:-80px;
        }

        .orb2{
          width:260px;
          height:260px;
          background:#7b2cff;
          bottom:-80px;
          right:-50px;
          animation-delay:2s;
        }

        .orb3{
          width:220px;
          height:220px;
          background:#ff4fd8;
          top:45%;
          left:60%;
          animation-delay:4s;
        }

        @keyframes float{
          0%{
            transform:translateY(0px) translateX(0px);
          }
          50%{
            transform:translateY(-30px) translateX(20px);
          }
          100%{
            transform:translateY(0px) translateX(0px);
          }
        }

        /* HEADER */

        .title{
          font-family:'Audiowide',sans-serif;
          font-size:3rem;
          color:white;
          text-shadow:0 0 25px #ff00ff;
          animation:glow 2s infinite alternate;
        }

        @keyframes glow{
          from{
            text-shadow:0 0 10px #ff00ff;
          }
          to{
            text-shadow:0 0 30px #ff4fd8;
          }
        }

        .subtitle{
          color:#d5bfff;
          font-size:1rem;
        }

        /* GLASS CARDS */

        .glass{
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.12);
          backdrop-filter:blur(18px);
          border-radius:28px;
          overflow:hidden;
          transition:0.4s;
          position:relative;
        }

        .glass::before{
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(
            120deg,
            rgba(255,255,255,0.12),
            transparent
          );
          opacity:0;
          transition:0.5s;
        }

        .glass:hover::before{
          opacity:1;
        }

        .glass:hover{
          transform:translateY(-10px) scale(1.01);
          box-shadow:0 20px 50px rgba(255,0,255,0.3);
        }

        /* STATS */

        .stat-number{
          font-size:3rem;
          font-weight:800;
          color:white;
        }

        /* DONATION CARDS */

        .donation-card{
          transition:0.35s;
          border:1px solid rgba(255,255,255,0.08);
        }

        .donation-card:hover{
          transform:translateY(-8px) scale(1.01);
          box-shadow:0 15px 40px rgba(255,0,255,0.25);
        }

        .badge-custom{
          padding:8px 16px;
          border-radius:30px;
          font-size:0.8rem;
          font-weight:700;
          text-transform:uppercase;
        }

        .fade-in{
          animation:fadeUp 1s ease;
        }

        @keyframes fadeUp{
          from{
            opacity:0;
            transform:translateY(30px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        /* APPRECIATION BOX */

        .thank-box{
          background:linear-gradient(
            135deg,
            rgba(255,0,255,0.15),
            rgba(123,44,255,0.18)
          );
          border:1px solid rgba(255,255,255,0.08);
        }

      `}</style>

      <div className="bg"></div>

      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <div className="container py-5 fade-in">

        {/* HEADER */}

        <div className="text-center mb-5">

          <h1 className="title">
            MY DONATIONS
          </h1>

          <p className="subtitle">
            Every donation creates hope for someone ❤️
          </p>

        </div>

        {/* STATS */}

        <div className="row mb-5">

          <div className="col-md-4 mb-4">

            <div className="glass p-4 text-center">

              <h5 className="text-light">
                Total Donations
              </h5>

              <div className="stat-number">
                {donations.length}
              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="glass p-4 text-center">

              <h5 className="text-light">
                Delivered
              </h5>

              <div className="stat-number">
                {deliveredCount}
              </div>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="glass p-4 text-center">

              <h5 className="text-light">
                People Helped
              </h5>

              <div className="stat-number">
                {totalPeopleHelped}+
              </div>

            </div>

          </div>

        </div>

        {/* APPRECIATION MESSAGE */}

        <div className="glass thank-box p-4 mb-5 text-center">

          <h2 className="text-white fw-bold mb-3">
            🌟 You Are Making A Difference
          </h2>

          <p
            style={{
              color:"#f3d9ff",
              fontSize:"1.1rem",
              lineHeight:"1.8"
            }}
          >
            Your kindness has helped families survive difficult times.
            Every food kit, medicine pack, blanket, and water bottle
            you donated brought hope to disaster victims.
          </p>

          <h5
            style={{
              color:"#ff7df5",
              marginTop:"20px"
            }}
          >
            Thank you for being a real-life hero 💜
          </h5>

        </div>

        {/* DONATION LIST */}

        <div className="row">

          {donations.length === 0 && (

            <div className="col-12">

              <div className="glass p-5 text-center">

                <h3 className="text-white">
                  No donations yet
                </h3>

                <p className="text-light">
                  Start helping people today ❤️
                </p>

              </div>

            </div>

          )}

          {donations.map((d, index) => (

            <div
              className="col-md-6 mb-4"
              key={index}
            >

              <div className="glass donation-card p-4 h-100">

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h3 className="text-white fw-bold">
                    {d.resource_type}
                  </h3>

                  <span
                    className="badge-custom"
                    style={{
                      background:
                        d.status === "delivered"
                        ? "rgba(0,255,170,0.15)"
                        : d.status === "assigned"
                        ? "rgba(255,208,0,0.15)"
                        : "rgba(255,0,255,0.15)",

                      color:
                        d.status === "delivered"
                        ? "#00ffaa"
                        : d.status === "assigned"
                        ? "#ffd000"
                        : "#ff7df5"
                    }}
                  >
                    {d.status}
                  </span>

                </div>

                <p className="text-light mb-2">
                  📦 Quantity:
                  <strong> {d.quantity}</strong>
                </p>

                <p className="text-light mb-2">
                  📍 Location:
                  <strong> {d.location}</strong>
                </p>

                <p className="text-light mb-2">
                  🕒 Donated On:
                  <strong>
                    {" "}
                    {d.created_at
                      ? new Date(d.created_at).toLocaleString()
                      : "N/A"}
                  </strong>
                </p>

                <hr style={{
                  borderColor:"rgba(255,255,255,0.08)"
                }} />

                {d.status === "delivered" ? (

                  <div>

                    <h5 style={{
                      color:"#00ffaa"
                    }}>
                      ✅ Successfully Reached Victims
                    </h5>

                    <p style={{
                      color:"#d5bfff"
                    }}>
                      Your donation helped families affected by disaster.
                      Your support brought relief and hope.
                    </p>

                  </div>

                ) : d.status === "assigned" ? (

                  <div>

                    <h5 style={{
                      color:"#ffd000"
                    }}>
                      🚚 On The Way
                    </h5>

                    <p style={{
                      color:"#d5bfff"
                    }}>
                      Your donation has been assigned and is currently
                      being delivered to people in need.
                    </p>

                  </div>

                ) : (

                  <div>

                    <h5 style={{
                      color:"#ff7df5"
                    }}>
                      💜 Ready To Help
                    </h5>

                    <p style={{
                      color:"#d5bfff"
                    }}>
                      Your donation is available and will soon help
                      disaster victims.
                    </p>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "50px"
  }

};

export default MyDonations;