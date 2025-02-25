const Restaurant = require("../models/restaurant");

// Find all restaurants in a specific city
exports.q1 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $match: {
          "location.city": "New York",
        },
      },
    ]);

    if (response) {
      return res.status(201).json({
        message: "Data Retrieved successfully",
        success: true,
        response,
      });
    }
    // else {
    //   return res.status(404).json({
    //     message: "Data not found",
    //     success: false,
    //   });
    // }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Find the average rating of all restaurants

exports.q2 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $group: {
          _id: "0",
          avgrating: { $avg: "$rating" },
        },
      },
    ]);
    if (response) {
      console.log("AvgRating", response);
      res.status(202).json({
        message: "Average Rating is calculatd",
        success: true,
        response,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Find restaurants with a rating above 4.5

// exports.q3 = async (req, res) => {
//   try {
//     const response = await Restaurant.aggregate([
//       {
//         $match: {
//           rating: { $gte: 0.5 },
//         },
//       },
//       {
//         $project: {
//           name: 1,
//           cuisine: 1,
//           rating: 1,
//         },
//       },
//     ]);
//     return res.status(200).json({
//       message: "Data retrieved Successfully",
//       success: "true",
//       response,
//     });
//   } catch (err) {
//     return res.status(501).json({
//       message: err.message,
//       success: "false",
//     });
//   }
// };

exports.q3 = async (req, res) => {
    try {
      const response = await Restaurant.find(
        { rating: { $gte: 0.5 } },
        { _id: 0, name: 1, cuisine: 1, rating: 1 }
      ).sort({ rating: -1 });
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Get the total number of reviews for each restaurant

exports.q4 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $project: {
          name: 1,
          reviewTotal: { $size: "$reviews" },
        },
      },
    ]);

    res.status(201).json({
      message: "Data Retrieved Successfully",
      success: "true",
      response,
    });
  } catch (err) {
    return res.status(501).json({
      message: err.message,
      success: "false",
    });
  }
};

// Find the most expensive dish in each restaurant’s menu

exports.q5 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $unwind: "$menu",
      },
      {
        $sort: { "menu.price": -1 },
      },
      {
        $group: {
          _id: "$name",
          mostExpensiveDish: { $first: "$menu" },
        },
      },
    ]);

    res.status(201).json({
      message: "Data Retrieved Successfully",
      success: "true",
      response,
    });
  } catch (err) {
    return res.status(501).json({
      message: err.message,
      success: "false",
    });
  }
};

//   Sort restaurants by their average review rating in descending order

// exports.q6 = async (req, res) => {
//     try {
//       const response = await Restaurant.aggregate([
//         // 1. Handle missing or empty review arrays
//         {
//           $addFields: {
//             reviews: { $ifNull: ["$reviews", []] } // Ensures reviews field is not null
//           }
//         },
//         // 2. Unwind the reviews array to process each review separately
//         {
//           $unwind: {
//             path: "$reviews",
//             preserveNullAndEmptyArrays: true // Ensures restaurants with no reviews are included
//           }
//         },
//         // 3. Group by restaurant name and calculate average rating
//         {
//           $group: {
//             _id: "$name", // Group by restaurant name
//             avgreviews: { $avg: "$reviews.rating" } // Compute average rating
//           }
//         },
//         // 4. Sort restaurants by average rating in descending order
//         {
//           $sort: { avgreviews: -1 }
//         }
//       ]);
  
//       res.status(200).json({
//         message: "Data Retrieved Successfully",
//         success: true,
//         response
//       });
//     } catch (err) {
//       return res.status(500).json({
//         message: err.message,
//         success: false
//       });
//     }
//   };

exports.q6 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $unwind: "$reviews",
      },
      {
        $group: {
          _id: "$name",
          avgreviews: { $avg: "$reviews.rating" },
        },
      },
      {
        $sort: { avgreviews: -1 },
      },
    ]);

    res.status(201).json({
      message: "Data Retrieved Successfully",
      success: "true",
      response,
    });
  } catch (err) {
    return res.status(501).json({
      message: err.message,
      success: "false",
    });
  }
};


  

// Find the restaurant with the highest-rated review


// exports.q7 = async (req, res) => {
//     try {
//       const response = await Restaurant.aggregate([
//         // 1. Find the highest rating among all restaurants
//         {
//           $group: {
//             _id: null,
//             highestRated: { $max: "$rating" }, // Find max rating
//           },
//         },
//         // 2. Lookup restaurants that have this highest rating
//         {
//           $lookup: {
//             from: "restaurants", // The collection name
//             localField: "highestRated", // Match max rating
//             foreignField: "rating",
//             as: "topRestaurants",
//           },
//         },
//         // 3. Unwind to get individual restaurant documents
//         {
//           $unwind: "$topRestaurants",
//         },
//         // 4. Project the full document of the top restaurant
//         {
//           $replaceRoot: { newRoot: "$topRestaurants" }
//         },
//         // 5. Limit to one restaurant (optional if multiple have the highest rating)
//         {
//           $limit: 1
//         }
//       ]);
  
//       res.status(200).json({
//         message: "Data Retrieved Successfully",
//         success: true,
//         response,
//       });
//     } catch (err) {
//       return res.status(500).json({
//         message: err.message,
//         success: false,
//       });
//     }
//   };
  

exports.q7 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $sort: { rating: -1 },
      },
      {
        $group: {
          _id: null,
          highestRated: { $max: "$rating" },
          mostRatedRetaurant: { $first: "$name" },
        },
      },
    ]);

    res.status(201).json({
      message: "Data Retrieved Successfully",
      success: "true",
      response,
    });
  } catch (err) {
    return res.status(501).json({
      message: err.message,
      success: "false",
    });
  }
};

// Calculate the average price of menu items for each cuisine type

exports.q8 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $unwind: "$menu",
      },
      {
        $group: {
          _id: "$cuisine",
          avgprice: {
            $avg: "$menu.price",
          },
        },
      },
    ]);

    res.status(201).json({
      message: "Data Retrieved Successfully",
      success: "true",
      response,
    });
  } catch (err) {
    return res.status(501).json({
      message: err.message,
      success: "false",
    });
  }
};

//   Find the city that has the most restaurants
exports.q9 = async (req, res) => {
  try {
    const response = await Restaurant.aggregate([
      {
        $group: {
          _id: "$location.city",
          restaurantCount: { $sum: 1 },
        },
      },
      {
        $sort: { restaurantCount: -1 },
      },
      
      {
        $limit:1
        // $group: {
        //   _id: null,
        //   maxRestaurantscount: { $first: "$restaurantCount" },
        //   topCity: { $first: "$_id" },
        // },
      },
      
    ]);

    res.status(201).json({
      message: "Data Retrieved Successfully",
      success: "true",
      response,
    }); 
  } catch (err) {
    return res.status(501).json({
      message: err.message,
      success: "false",
    });
  }
};

//   Retrieve all restaurants that have a menu item costing more than $12

// exports.q10 = async (req, res) => {
//   try {
//     const response = await Restaurant.aggregate([
//       {
//         $unwind: "$menu",
//       },
//       {
//         $match: {
//           "menu.price": { $gte: 12 },
//         },
//       },
//       {
//         $group: {
//           _id: "$name",
//           menuItems: { $push: "$menu" },
//         },
//       },
//     ]);

//     res.status(201).json({
//       message: "Data Retrieved Successfully",
//       success: "true",
//       response,
//     });
//   } catch (err) {
//     return res.status(501).json({
//       message: err.message,
//       success: "false",
//     });
//   }
// };

exports.q10 = async (req, res) => {
    try {
      const response = await Restaurant.aggregate([
        {
          $match: { "menu.price": { $gte: 12 } } // Filter restaurants with at least one item ≥ $12
        },
        {
          $project: {
            name: 1,
            menuItems: {
              $filter: {
                input: "$menu",
                as: "item",
                cond: { $gte: ["$$item.price", 12] } // Keep only menu items with price ≥ 12
              }
            }
          }
        }
      ]);
  
      res.status(201).json({
        message: "Data Retrieved Successfully",
        success: "true",
        response,
      });
    } catch (err) {
      return res.status(501).json({
        message: err.message,
        success: "false",
      });
    }
  };
  