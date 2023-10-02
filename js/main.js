function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

  function getamenities(listing) {
    const amenities = listing.amenities
      .slice(1, -1)
      .split(",")
      .map((a) => a.trim());
    let amenityList = "";
    for (let amenity of amenities) {
      amenity = amenity.slice(1, -1);
      amenityList += `<li>${amenity}</li>`;
    }
    return amenityList;
  }

  function getListingCode(listing) {
    const amenities = getamenities(listing);
    return `
    <div
            class="col-lg-4 col-md-6 col-sm-12 scroll"
            style="margin-bottom: 50px"
          >
            <div
              class="listing card"
              style="max-height: 500px; overflow-y: auto; margin-bottom: 20px"
            >
              <img
                src="${listing.picture_url}"
                class="card-img-top"
                alt="AirBNB Listing"
                style="width: 100%; height: 250px"
              />
              <div class="card-body">
                <div class="row">
                  <div class="col-10">
                    <h2 class="card-title">${listing.name}</h2>
                  </div>
                  <div class="col-2">
                    <img
                      src="${listing.host_thumbnail_url}"
                      alt="${listing.host_name}"
                    />
                  </div>
                </div>
                <div><strong>Price:</strong> ${listing.price}</div>
                <p class="card-text">${listing.description}</p>
                <div><strong>Host:</strong> ${listing.host_name}</div>
                <img
                  src="${listing.host_thumbnail_url}"
                  alt="${listing.host_name}"
                />
                <div><strong>Amenities:</strong> ${amenities}</div>
              </div>
            </div>
            <!-- /card -->
            <a
              href="${listing.listing_url}"
              target="_blank"
              class="btn btn-primary"
              >View Listing</a
            >
          </div>
  `;
  }

  function redraw(listings) {
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();

    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();

main.loadData();
