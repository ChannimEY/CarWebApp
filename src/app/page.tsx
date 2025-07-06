// import { AuthRequiredError } from "@/lib/exception";

import { CarouselDApiDemo } from "@/components/(landing)/carousel/CarouselComponent";
import { MarqueeDemo } from "@/components/(landing)/testimonial/TestimonialComponent";
import { HeroVideoDialogDemo } from "@/components/(landing)/VideoComponent/VideoComponent";
import { Button } from "@/components/ui/button";
import { Car, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {

  // const session = null;

  // if(!session) throw new AuthRequiredError();

  return(
    <div>
       <CarouselDApiDemo/>
       
       {/* Car Listings Showcase */}
       <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-gray-900 mb-4">
               Discover Amazing Cars
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Browse our extensive collection of cars. Create, update, and manage your own listings with our secure authentication system.
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 mb-12">
             <div className="text-center p-6">
               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Car className="h-8 w-8 text-blue-600" />
               </div>
               <h3 className="text-xl font-semibold mb-2">Browse Cars</h3>
               <p className="text-gray-600">Explore our collection of cars with detailed information and images.</p>
             </div>
             
             <div className="text-center p-6">
               <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Users className="h-8 w-8 text-green-600" />
               </div>
               <h3 className="text-xl font-semibold mb-2">User Authentication</h3>
               <p className="text-gray-600">Secure login and registration with JWT tokens for protected operations.</p>
             </div>
             
             <div className="text-center p-6">
               <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Shield className="h-8 w-8 text-purple-600" />
               </div>
               <h3 className="text-xl font-semibold mb-2">CRUD Operations</h3>
               <p className="text-gray-600">Create, read, update, and delete car listings with full control.</p>
             </div>
           </div>
           
           <div className="text-center">
             <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
               <Link href="/cars">
                 View All Cars
               </Link>
             </Button>
           </div>
         </div>
       </section>
       
       {/* testimonial */}
       <MarqueeDemo/>
       {/* video  */}
       <HeroVideoDialogDemo/>
       
    </div>
   
    
  )
 
}
