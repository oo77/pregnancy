import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


async function uploadPhotoFile(file) {
    const store = getStorage()
    const fileRef = ref(store, `pictures/${localStorage.getItem("userUid")}`)
    await uploadBytes(fileRef, file).then(s => {
    })
}

async function getUserPhotosById(uid) {
    // const storage = getStorage();
    // let urlByUid
    // await getDownloadURL(ref(storage, `pictures/${uid}`))
    //     .then((url) => {
    //
    //         urlByUid = url
    //     })
    //     .catch((error) => {
    //         urlByUid = "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png";
    //     });
    return "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png";
    ;
}

export {
    uploadPhotoFile, getUserPhotosById
}