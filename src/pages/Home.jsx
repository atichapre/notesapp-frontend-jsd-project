export default function Home() {
  return (
    <main>
      <div className="bg-banner">
        <div className="container__div">
          <BannerSlider />
        </div>
      </div>

      <div className="bg-greenBackground">
        <div className="container__div">
          <CardSlider name="New Release" />
          <CardSlider name="Best Seller" />
        </div>
      </div>

      <div className="bg-banner">
        <div className="container__div">
          <TopList />
        </div>
      </div>

      <div className="bg-greenBackground">
        <div className="container__div"></div>
        <ShowAll />
      </div>
    </main>
  );
}
