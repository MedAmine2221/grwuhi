import { Label, TextArea, TextField } from '@heroui/react'

export default function PostDescription() {
  return (
    <TextField isRequired className="w-full" name="fullName">
      <Label>Post Description</Label>
      <TextArea
        className="w-full border-2 border-[#d99934] mb-4"
        placeholder="Describe the post"
        variant="primary"
      />    
    </TextField>
  )
}
