import { Button, Modal } from '@heroui/react'
import Image from 'next/image'

export default function QuizModal() {
  return (
    
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger />
            <Modal.Header>
              <div className='flex items-center justify-center'>
                <Image src="/hiring-interview.png" alt='hiring-interview' loading='eager' width={100} height={100} className='w-25 h-25 m-2' />
              </div>
              <Modal.Heading>     
                <p className='m-2 text-lg font-bold text-center'>Hiring Interview</p>
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className='text-center'>
                Hello Mohamed Amine, Are you ready to begin your hiring interview for the next js developer post !
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full bg-[#d99934]" slot="close">
                {"Let's Go !"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
  )
}
