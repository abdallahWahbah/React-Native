import * as SQLITE from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLITE.openDatabase("places.db");// the name of the data base

export const init = () =>
{
    const promise = new Promise((resolve, reject) =>
    {
        database.transaction(tx =>
        {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`// real is a number with decimal places
                ,
                [], // array that may be used in the statement
                () => // callback that will be executed if everything succedded
                {
                    resolve();
                },
                (_, error) => // callback that will ba executed if we have an error
                {
                    reject(error)
                }
            );
        });
    });
    return promise;
}

export const insertPlaceSQLITE = (place) =>
{
    const promise = new Promise((resolve, reject) =>
    {
        database.transaction(tx => 
        {
            tx.executeSql(
                `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (? ,? ,? ,? ,?)`,
                [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],
                (_, result) =>{
                    resolve(result)
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });
    return promise;
}

export const fetchPlacesSQLITE = () =>
{
    const promise = new Promise((resolve, reject) =>
    {
        database.transaction(tx => 
        {
            tx.executeSql(
                `SELECT * FROM places`
                , [], 
                (_, result) => {
                    const places = [];
                    for(const place of result.rows._array)
                    {
                        places.push(new Place(
                            place.title,
                            place.imageUri,
                            {
                                address: place.address,
                                lat: place.lat,
                                lng: place.lng
                            },
                            place.id
                        ))
                    }
                    resolve(places);
                }, 
                (_, error) => {
                    reject(error)
                });
        });
    });
    return promise;
}

export const fetchPlaceDetailsSQLITE = id =>
{
    const promise = new Promise((resolve, reject) =>
    {
        database.transaction(tx =>
        {
            tx.executeSql(
                `SELECT * FROM places WHERE id = ?`,
                [id],
                (_, result)=>
                {
                    const placeDatabase = result.rows._array[0];
                    const newPlace = new Place(
                        placeDatabase.title, 
                        placeDatabase.imageUri, 
                        {
                            address: placeDatabase.address,
                            lat: placeDatabase.lat,
                            lng: placeDatabase.lng,
                        }, 
                        placeDatabase.id)
                    resolve(newPlace)
                },
                (_, error) =>
                {   
                    reject(error)
                }
            )
        })
    });
    return promise;
}