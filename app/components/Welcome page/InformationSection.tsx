"use client"
import { RecipeCard } from "../Recipe Card/ReciepeCard";
import { RecipeCard2 } from "../Recipe Card/RecipeCard2";
import { RecipeCard3 } from "../Recipe Card/RecipeCard3";
import { RecipeCard4 } from "../Recipe Card/RecipeCard4";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import{db} from '../../../firebaseConfig'
import { URL } from "url";

interface RecipeListProps{
    collectionName: string;
}

interface Recipe{
    id: string;
    Name?:string;
    Description?:string;
    Picture?:string;
}
  

export function InformationSection( {collectionName} : RecipeListProps){
    const[emblaRef] = useEmblaCarousel({loop:true}, [Autoplay()])

    const[items, setItems] = useState<Recipe[]>([]);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchData = async ()=>{
            try{
                const querySnapshot = await getDocs(collection(db,collectionName));
                const data: Recipe[] = querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()})) as Recipe[];
                setItems(data);
            }catch(error){
                console.error("Error fetching data: ", error);
                setError("Failed to Load Data")
            }finally{
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]);

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return(
            <>
            <div className="information-cointainer flex flex-col w-full h-[60%] mx-auto pt-[5%] pb-[2%] pr-[2%] pl-[2%] gap-[5%] items-start shrink-0 flex-nowrap relative drop-shadow">
                <span className="self-stretch shrink-0 basis-auto font-['Inter'] text-[2vw] leading-xl text-[#1e1e1e] relative text-center whitespace-nowrap z-[1] justify-left pb-[2%]">
                    {error}
                </span>  
            </div>
             
            </>
        );
    }

    return(
        <>
        <div className="information-cointainer flex flex-col w-full h-[60%] mx-auto pt-[5%] pb-[5%] pr-[2%] pl-[2%] gap-[5%] items-start shrink-0 flex-nowrap relative drop-shadow bottom-0">
            <span className="self-stretch shrink-0 basis-auto font-['Inter'] text-[2vw] leading-xl text-[#1e1e1e] relative text-left whitespace-nowrap z-[1] justify-left pb-[2%]">
                Get Access to Thousands of Recipes
            </span>  
            
            <Carousel className=' w-[90%] h-full relative mr-[5%] ml-[5%] pt-[2%]' plugins={[Autoplay({delay:2000,}),]}>
                <CarouselPrevious />
                <CarouselContent>
                    {items.map((item) => (
                         <CarouselItem className='basis-1/4' key={item.id}> 
                            <RecipeCard name={item.Name}
                            description={item.Description}
                            imageUrl={item.Picture}
                            />
                         </CarouselItem>
                    ))}
                   
                </CarouselContent>
                <CarouselNext />
            </Carousel>
        </div>
         
        </>
    );


}
