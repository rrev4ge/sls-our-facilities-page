'use strict'



window.addEventListener('DOMContentLoaded', function() {

    class Facility {
        constructor({ id, title, info, photos, parent }) {
            this._id = id;
            this._title = title;
            this._info = info;
            this._photos = photos;
            this._parent = parent;
        }

        setExpandedImg(imgs) {
            console.log({ imgs });
            // Get the expanded image
            const expandImg = document.getElementById("expandedImg");
            // Get the image text
            const imgTitle = document.getElementById("imgText");
            // Use the same src in the expanded image as the image being clicked on from the grid
            expandImg.src = imgs.src;
            // Use the value of the alt attribute of the clickable image as text inside the expanded image
            imgTitle.innerHTML = imgs.alt;
            // Show the container element (hidden with CSS)
            // expandImg.parentElement.style.display = "block";
        }

        renderFilterList() {
            const filterList = document.createElement("div");
            filterList.classList.add("filterList");
            facilities.forEach((facility, key) => {
                const element = document.createElement("span");
                element.innerHTML = facility.title;
                element.onclick = (e) => {
                    e.target.classList = "filterLink filterLink-active";
                    const gallery = document.getElementsByClassName("gallery");
                    gallery[0].remove();
                    const facilitiTxt = document.getElementsByClassName("facilitiTxt");
                    facilitiTxt[0].remove();
                    console.log({ facility, gallery, facilitiTxt });
                    this._parent.append(this.renderGallery(facility), this.renderFacilitiTxt(facility));
                };
                element.classList.add("filterLink");
                filterList.append(element);
            });
            return filterList;
        }

        renderGallery(facility) {
            const list = document.createElement("div");
            list.classList.add("row");
            const expandedBox = document.createElement("div");
            expandedBox.classList.add("container");
            const expandedImg = document.createElement("img");
            expandedImg.id = "expandedImg";
            const expandedImgTxt = document.createElement("div");
            expandedImgTxt.id = "imgText";
            expandedBox.append(expandedImg, expandedImgTxt);
            facility.photos.forEach((photo, key) => {
                const element = document.createElement("div");
                const img = document.createElement("img");
                img.src = photo;
                expandedImg.src = img.src;
                img.alt = `${facility.title}-photo-${key}`;
                expandedImgTxt.innerHTML = img.alt;
                img.onclick = (e) => this.setExpandedImg(e.target);
                element.classList.add("column");
                element.append(img);
                list.append(element);
            });
            const gallery = document.createElement("div");
            gallery.classList.add("gallery");
            gallery.append(expandedBox, list);
            return gallery;
        }

        renderFacilitiTxt(facility) {
            const facilitiTxt = document.createElement("div");
            facilitiTxt.classList.add("facilitiTxt");
            facilitiTxt.innerText = facility.info;
            return facilitiTxt;
        }

        render() {
            this._parent.append(
                this.renderFilterList(),
                this.renderGallery(facilities[0]),
                this.renderFacilitiTxt(facilities[0])
            );
        }
    };

    domElementGenerator(
        "div",
        "header",
        "",
        "Header & Menu");
    domElementGenerator("div", "header", "", "Наши Работы");
    domElementGenerator("div", "main", "pageTitle", facilities[0].title);
    domElementGenerator('div', 'main', 'facilitiesContainer');
    listResolve(facilities[0], Facility, ".facilitiesContainer");
});
