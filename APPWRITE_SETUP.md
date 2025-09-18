# Appwrite Database Setup

## Required Collection Attributes

Your `guests` collection in Appwrite needs the following attributes:

### Required Attributes:
- `email` (String, required)
- `firstName` (String, required) 
- `lastName` (String, required)
- `phone` (String, required)
- `uniqueCode` (String, required) - 6-character alphanumeric code
- `isCheckedIn` (Boolean, required, default: false)
- `extraGuests` (Integer, optional, default: 0)

## How to Add Missing Attributes:

1. Go to your Appwrite Console
2. Navigate to Databases → birthday-invite → guests collection
3. Click on "Attributes" tab
4. Click "Create Attribute" for each missing attribute:

### For uniqueCode:
   - **Key**: `uniqueCode`
   - **Type**: `String`
   - **Size**: `6`
   - **Required**: `Yes` (checked)
   - **Default**: (leave empty)
   - **Array**: `No` (unchecked)

### For extraGuests:
   - **Key**: `extraGuests`
   - **Type**: `Integer`
   - **Size**: `64` (or leave default)
   - **Required**: `No` (unchecked)
   - **Default**: `0`
   - **Array**: `No` (unchecked)

## Collection Permissions:
Make sure your collection has these permissions:
- Create: `any`
- Read: `any` 
- Update: `any`
- Delete: `any`

## Testing:
After adding the attribute, try registering a guest again. The registration should work properly now.
