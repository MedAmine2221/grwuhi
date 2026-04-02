import { PostDescriptionProps } from '@/constants/interfaces'
import { Label, TextArea, TextField } from '@heroui/react'

export default function PostDescription({setPostDesc, postDesc, isPressed}: PostDescriptionProps) {
  return (
    <TextField isInvalid={!postDesc && isPressed} isRequired className="w-full" name="fullName">
      <Label>Post Description</Label>
      <TextArea
        className={`h-50 w-full border-2 ${!postDesc && isPressed ? "border-red-400 placeholder:text-red-400" : "border-[#d99934] placeholder:text-[#d99934]"} mb-4`}
        placeholder="Describe the post"
        variant="primary"
        onChange={(e) => setPostDesc(e.currentTarget.value)}
      />    
    </TextField>
  )
}
