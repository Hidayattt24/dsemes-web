/**
 * Calculates daily calorie target (TDEE) using Mifflin-St Jeor equation & activity multipliers
 * matching dsmes-backend internal/modules/nutrition/calculator.go
 */
export function calculateDSMESCalorieTarget(params: {
  gender?: string;
  weight?: number;
  weightKg?: number;
  height?: number;
  heightCm?: number;
  age?: number;
  activityLevel?: string;
  physicalActivityLevel?: string;
  dailyCalorieTarget?: number;
  calorieStatusInfo?: { targetCalories?: number };
}): number {
  const weight = params.weightKg || params.weight;
  const height = params.heightCm || params.height;

  // Fallback to pre-calculated properties if height/weight are missing
  if (!weight || !height) {
    if (params.dailyCalorieTarget && params.dailyCalorieTarget > 0) {
      return params.dailyCalorieTarget;
    }
    if (params.calorieStatusInfo?.targetCalories && params.calorieStatusInfo.targetCalories > 0) {
      return params.calorieStatusInfo.targetCalories;
    }
  }

  const w = weight || 60;
  const h = height || 160;
  const age = params.age || 40;
  const genderStr = (params.gender || "").toLowerCase();
  const isMale = genderStr === "laki-laki" || genderStr === "laki_laki" || genderStr === "male";

  const activityStr = (params.activityLevel || params.physicalActivityLevel || "").toLowerCase();
  let multiplier = 1.375; // Default: Light / Ringan

  if (activityStr.includes("sangat rendah") || activityStr.includes("very low") || activityStr === "1.2") {
    multiplier = 1.20;
  } else if (activityStr.includes("ringan") || activityStr.includes("light") || activityStr === "1.375") {
    multiplier = 1.375;
  } else if (activityStr.includes("sedang") || activityStr.includes("moderate") || activityStr === "1.55") {
    multiplier = 1.55;
  } else if (activityStr.includes("sangat aktif") || activityStr.includes("very high") || activityStr === "1.9") {
    multiplier = 1.90;
  } else if (activityStr.includes("aktif") || activityStr.includes("high") || activityStr === "1.725") {
    multiplier = 1.725;
  }

  // Mifflin-St Jeor Equation
  // Male:   BMR = (10 × W) + (6.25 × H) - (5 × A) + 5
  // Female: BMR = (10 × W) + (6.25 × H) - (5 × A) - 161
  const bmr = isMale
    ? 10 * w + 6.25 * h - 5 * age + 5
    : 10 * w + 6.25 * h - 5 * age - 161;

  const tdee = bmr * multiplier;
  return Math.round(tdee);
}
