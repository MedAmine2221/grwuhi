/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from '@heroui/react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export default function QuizModal() {
  const loading = useSelector((state: any) => state.loading.loading);
  const quiz = useSelector((state: any) => state.quiz.quiz);  
  return (
    <>
      {
        !quiz ?(
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
                  <Button isDisabled={loading} className={`w-full bg-[#d99934] ${loading ? "text-default" :""}`} slot="close">
                    {loading &&(
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>)}
                    {loading ? "Cretaing Quiz..." : "Let's Go !"}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        ):(
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-90">
                <Modal.CloseTrigger />
                <Modal.Header>
    
                  <Modal.Heading>     
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                
                </Modal.Body>
                <Modal.Footer>
          
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        )
      }
    </>
  )
}
            