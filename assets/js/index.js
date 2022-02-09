'use strict'

window.addEventListener('DOMContentLoaded', function() {

    const infoProps = {
        name: "",
        location: "Расположение:",
        accessories: "Комплектующие:",
        price: "Стоимость:",
        annualIncome: "Годовой доход:",
        paybackPeriod: "Период окупаемости:",
        description: "Дополнительно:",
    };
    class Facility {
        constructor({ id, title, info, photos, parent }) {
            this._id = id;
            this._title = title;
            this._info = info;
            this._photos = photos;
            this._parent = parent;
        }

        setExpandedImg(imgs) {
            const expandImg = document.getElementById("expandedImg");
            const imgTitle = document.getElementById("imgText");
            expandImg.src = imgs.src;
            imgTitle.innerHTML = imgs.alt;
        }

        renderFilterList() {
            const filterList = document.createElement("div");
            filterList.classList.add("filterList");
            facilities.forEach((facility, key) => {
                const element = document.createElement("span");
                element.innerHTML = facility.title;
                element.onclick = (e) => {
                    // e.target.classList = "filterLink filterLink-active";
                    const prevTargetLink = document.getElementsByClassName("filterLink-active");
                    prevTargetLink[0]?.classList?.remove("filterLink-active");
                    e.target.classList = "filterLink filterLink-active";
                    const gallery = document.getElementsByClassName("gallery");
                    gallery[0].remove();
                    const facilitiInfo = document.getElementsByClassName("facilitiInfo");
                    facilitiInfo[0].remove();
                    const facilitiTitle = document.getElementsByClassName("facilitiTitle");
                    facilitiTitle[0].innerText = facility.title;
                     const facilitiesContainerBody = document.getElementsByClassName("facilitiesContainerBody");
                    facilitiesContainerBody[0].append(this.renderGallery(facility), this.renderFacilitiInfo(facility));
                };
                element.classList.add("filterLink");
                filterList.append(element);
            });
            return filterList;
        }

        renderGallery(facility) {
            const list = document.createElement("div");
            list.classList.add("galleryList");
            const expandedBox = document.createElement("div");
            expandedBox.classList.add("galleryExpandedBox");
            const expandedImg = document.createElement("img");
            expandedImg.classList.add("galleryExpandedImg");
            expandedImg.id = "expandedImg";
            const expandedImgTxt = document.createElement("div");
            expandedImgTxt.id = "imgText";
            expandedBox.append(expandedImg, expandedImgTxt);
            facility.photos.forEach((photo, key) => {
                const img = document.createElement("img");
                img.classList.add("galleryListItem");
                img.src = photo;
                expandedImg.src = img.src;
                img.alt = `${facility.title}-photo-${key}`;
                expandedImg.alt = img.alt;
                expandedImgTxt.innerHTML = img.alt;
                img.onclick = (e) => this.setExpandedImg(e.target);
                list.append(img);
            });
            const gallery = document.createElement("div");
            gallery.classList.add("gallery");
            gallery.append(expandedBox, list);
            return gallery;
        }

        renderFacilitiInfo(facility) {
            const { info } = facility;
            const facilitiInfo = document.createElement("div");
            facilitiInfo.classList.add("facilitiInfo");
            if (info && typeof info === "string") {
                facilitiInfo.innerText = facility.info;
            }
            if (info && typeof info === "object") {
                for (const [key, value] of Object.entries(info)) {
                    if (value !== null && typeof value === "string") {
                        const description = document.createElement("div");
                        description.innerHTML = `<div class=${ infoProps[key] ? "facilitiInfoItem" : ""}><div>${infoProps[key]}</div><div>${value}</div></div>`;
                        facilitiInfo.append(description);
                    }
                    if (value !== null && Array.isArray(value)) {
                        const description = document.createElement("ul");
                        description.innerText = infoProps[key];
                        value.forEach((item, key) => {
                            const listItem = document.createElement("li");
                            listItem.innerHTML = item;
                            description.append(listItem);
                        });
                        facilitiInfo.append(description);
                    }
                }
            }

            return facilitiInfo;
        }

        renderFacilitiTitle(facility) {
            const facilitiTitle = document.createElement("div");
            facilitiTitle.classList.add("facilitiTitle");
            facilitiTitle.innerText = facility.title;
            return facilitiTitle;
        }

        renderFacilitiesContainerBody() {
            const facilitiesContainerBody = document.createElement("div");
            facilitiesContainerBody.classList.add("facilitiesContainerBody");
            facilitiesContainerBody.append(
                this.renderFacilitiTitle(facilities[0]),
                this.renderGallery(facilities[0]),
                this.renderFacilitiInfo(facilities[0])
            );
            return facilitiesContainerBody;
        }

        render() {
            this._parent.append(
                this.renderFilterList(),
                this.renderFacilitiesContainerBody()
            );
        }
    };

    domElementGenerator(
        "div",
        "header",
        "",
        "Header & Menu");
    domElementGenerator("div", "header", "", "Наши Работы");
    domElementGenerator('div', 'main', 'facilitiesContainer');
    listResolve(facilities[0], Facility, ".facilitiesContainer");
});
