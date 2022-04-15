import { MdShower, MdLocalDrink, MdWifi, MdElectricalServices, MdOutlinePets, MdVideocam, MdLocalParking, MdCabin, MdBungalow, MdDirectionsBike } from 'react-icons/md';
import { FaRestroom, FaCaravan, FaHiking, FaCar, FaCampground } from 'react-icons/fa';

export const ratingLabels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

export const campgroundFacilities = [
    { name: "water / spring", icon: MdLocalDrink },
    { name: "shower", icon: MdShower },
    { name: "toilet", icon: FaRestroom },
    { name: "internet", icon: MdWifi },
    { name: "electricity", icon: MdElectricalServices },
    { name: "pet friendly", icon: MdOutlinePets },
    { name: "video security", icon: MdVideocam },
    { name: "parking", icon: MdLocalParking },
    { name: "bike rental", icon: MdDirectionsBike },
];

export const landscapeType = [     
    "mountain campsite",
    "beach campsite",
    "countryside campsite",
    "mountain hut",
    "mountain refuge",
];

export const accomodationType = [
    {name: "tent", icon: FaCampground},
    {name: "hut", icon: MdBungalow},
    {name: "camper van", icon: FaCaravan}
];

export const locationAccess = [
    {name: "only walk", icon: FaHiking},
    {name: "car", icon: FaCar},
    {name: "caravan", icon: FaCaravan},
];

export const navBarItems = [
    {
        path: "/campgrounds",
        label: "Campgrounds",
        onlyUser: false,
    },

    {
        path: "/contact",
        label: "Contact",
        onlyUser: false,
    },

    {
        path: "/newcampground",
        label: "Add new campground",
        onlyUser: true,
    },
];

export const deleteCampDialogTextContent = {
    header: "Remove this Campground?",
    message: "You are about to remove this campground and it's data. Are you sure?"
}