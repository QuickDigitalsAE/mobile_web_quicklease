import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonAboutUs = () => {
    return (
         <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
            <div className="aboutPage pr-10 max-lg:pr-6">
                {/* Meta Tags and Description */}
                <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
                    <Skeleton height={24} width="50%" />
                    <Skeleton height={48} className="mt-3 rounded-xl" />
                    <Skeleton height={96} className="mt-3 rounded-xl" />
                </div>

                {/* Banner */}
                <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
                    <Skeleton height={24} width="30%" />
                    <Skeleton height={48} className="mt-3 rounded-xl" />
                    <Skeleton height={160} className="mt-3 rounded-3xl" />
                </div>

                {/* Section 1 */}
                <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
                    <Skeleton height={24} width="30%" />
                    <div className="grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                        {[...Array(3)].map((_, index) => (
                            <div className="bg-[#DEE5F2] p-4 rounded-lg" key={index}>
                                <Skeleton height={24} width="60%" />
                                <Skeleton height={48} className="mt-3 rounded-xl" />
                                <Skeleton height={96} className="mt-3 rounded-xl" />
                                <Skeleton height={160} className="mt-3 rounded-3xl" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2 */}
                <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
                    <Skeleton height={24} width="30%" />
                    <Skeleton height={48} className="mt-3 rounded-xl" />
                    <div className="grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                        {[...Array(3)].map((_, index) => (
                            <div className="bg-[#DEE5F2] p-4 rounded-lg" key={index}>
                                <Skeleton height={24} width="60%" />
                                <Skeleton height={48} className="mt-3 rounded-xl" />
                                <Skeleton height={160} className="mt-3 rounded-3xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonAboutUs;
